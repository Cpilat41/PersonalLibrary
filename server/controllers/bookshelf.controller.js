const Bookshelf = require("../models/bookshelf.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = {
  createNewBook: (req, res) => {
    const newObject = new Bookshelf(req.body);
    //new Authors must match above const
    //need encyrpted usetoken
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
      complete: true,
    });

    newObject.createdBy = decodedJWT.payload.id;

    newObject
      .save()

      // console.log(req.body);
      // Bookshelf.create(req.body)
      .then((newbook) => {
        console.log(newbook);
        res.json(newbook);
      })
      .catch((err) => res.status(400).json({ err }));
  },

  showAllBooks: (req, res) => {
    Bookshelf.find()
      .sort({ bestRead: 1 })
      .populate("createdBy", "username email")
      .then((allbooks) => {
        console.log(allbooks);
        res.json(allbooks);
      })
      .catch((err) => {
        console.log("error showing all books");
        res.status(400).json(err);
      });
  },
  oneBookDescription: (req, res) => {
    Bookshelf.findOne({ _id: req.params.id })
      .then((description) => {
        console.log(description);
        res.json(description);
      })
      .catch((err) => {
        console.log("error showing this description");
        res.status(400).json(err);
      });
  },
  updateBook: (req, res) => {
    Bookshelf.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedbook) => res.json(updatedbook))
      .catch((err) => {
        console.log("error updating description");
        res.status(400).json(err);
      });
  },

  findllAllBooksbyUser: (req, res) => {
    if (req.jwtpayload.username !== req.params.username) {
      console.log("not the user");

      User.findOne({ username: req.params.username })
        .then((userNotLoggedIn) => {
          Bookshelf.find({ createdBy: userNotLoggedIn._id })
            .populate("createdBy", "username")
            .then((allBooksFromUser) => {
              console.log(allBooksFromUser);
              res.json(allBooksFromUser);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    } else {
      console.log("current user");
      console.log("req.jwtpayload.id:", req.jwtpayload.id);
      Bookshelf.find({ createdBy: req.jwtpayload.id })
        .populate("createdBy", "username")
        .then((allBooksFromLoggedInUser) => {
          console.log(allBooksFromLoggedInUser);
          res.json(allBooksFromLoggedInUser);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  },

  removeBook: (req, res) => {
    Bookshelf.deleteOne({ _id: req.params.id })
      .then((deletedbook) => {
        console.log(deletedbook);
        res.json({ deleted: deletedbook });
      })
      .catch((err) => {
        console.log("error deleting book");
        res.status(400).json(err);
      });
  },
};
