const mongoose = require("mongoose");
const BookshelfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is requried"],
      minlength: [3, "Title must be at least 3 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is requried"],
      minlength: [3, "Author must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Title is requried"],
      maxlength: [100, "Cannot be more than 100 Characters"],
    },
    favoriteQuote: {
      type: String,
    },
    haveRead: {
      type: String,
      enum: ["-----", "Yes", "No"],
      required: [true, "Have you read this book?"],
    },
    bestRead: {
      type: String,
      enum: [
        "Hiking/Camping",
        "At the beach",
        "When it's cold",
        "Spooky Season",
        "On a Rainy Day",
        "By a fireplace",
        "Under the covers",
        "On a Picnic",
      ],
      required: [
        true,
        "Come on, we're dying to know your favorite place or time to read this!",
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bookshelf", BookshelfSchema);
