require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const MY_PORT = 8000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/bookshelf.routes")(app);

app.listen(process.env.MY_PORT, () => {
  console.log(`Listening at Port ${process.env.MY_PORT}`);
});
