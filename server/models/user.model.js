const mongoose = require("mongoose");
const bcypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email addess is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password MUST be at least 8 characters"],
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

//we need middleware

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match");
    console.log("Passwords don't match");
  }
  next();
});
//basically telling middleware - before you validate take in the "next" function
UserSchema.pre("save", function (next) {
  console.log("in pre-save");
  //here is where we'll use bcrypt to encrypt data during registration process
  bcypt
    .hash(this.password, 10)
    //hash is like shuffling a deck of cards
    //the number(10) or however many you want, it s #of times we'll shuffle
    //the info, encrypt the info coming in
    .then((hashedPassedword) => {
      this.password = hashedPassedword;
      next();
    });
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
