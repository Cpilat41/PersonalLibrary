const BookShelfController = require("../controllers/bookshelf.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/bookshelf/addbook", authenticate, BookShelfController.createNewBook);
  app.get("/api/bookshelf/Home", BookShelfController.showAllBooks);
  app.get("/api/bookshelf/:id", BookShelfController.oneBookDescription);
  app.get("/api/booksbyuser/:username", authenticate, BookShelfController.findllAllBooksbyUser);
  app.put("/api/bookshelf/:id", BookShelfController.updateBook);
  app.delete("/api/bookshelf/:id", BookShelfController.removeBook);
};
