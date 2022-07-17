const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    const user = new User(req.body);

    user
      .save()
      .then((newUser) => {
        console.log(newUser);
        console.log("successfully registered");
        res.json({
          successMessage: "Thank you for registering",
          user: newUser,
        });
      })
      .catch((err) => {
        console.log("reg not sucessful");
        res.status(400).json(err);
      });
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((userRecord) => {
        //checking if the return object is null - do we have thi semail?
        if (userRecord === null) {
          res.status(400).json({ message: "Invalid Login Attempt" });
        } else {
          bcrypt
            .compare(req.body.password, userRecord.password)
            //should return boolean t/f
            .then((isPasswordValid) => {
              if (isPasswordValid) {
                console.log("pw is valid");
                res
                  .cookie(
                    "usertoken",
                    jwt.sign(
                      {
                        //payload is object/data we want to save
                        //below is json webtoken
                        id: userRecord._id,
                        email: userRecord.email,
                        username: userRecord.username,
                        //we need a key to sign and hash the cookie's data
                        //our payload needs a secret key. we'll use the .env file to store the key properly
                      },
                      process.env.JWT_SECRET
                    ),
                    //passing in some cookies for extra security
                    //configuration settings for this cookie (options) we will make sure these cookies are httpOnly
                    //this meams that the cookies are essentially invisible to client-side javascript and ccan only be read by the server
                    {
                      httpOnly: true,
                      expire: new Date(Date.now + 90000000),
                    }
                  )
                  .json({
                    message: "sucessfully",
                    userLoggedIn: userRecord.username,
                    userID: userRecord._id,
                  });
              } else {
                res.status(400).json({ message: "Invalid attempt" });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "Invalid attempt" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Invalid attempt" });
      });
  },
  logout: (req, res) => {
    console.log("logging out");
    res.clearCookie("usertoken");
    res.json({
      message: "You have successfully logged out",
    });
  },
  //below we're decoding the usertoken inside the jwt sign\
  //what is the usertoken that we're trying to decode - it's a COOKIE
  //cookie that has a value of our jwt token
  getLogginInUser: (req, res) => {
    // const decodedJWT = jwt.decode(req.cookies.usertoken, {
    //   complete: true,
    // });
    User.findOne({ _id: req.jwtpayload.id }) //maybe change this back to below?
      // decodedJWT.payload.id })
      .then((user) => {
        console.log(user);
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
