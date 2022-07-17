const mongoose = require("mongoose");
// const dbName = process.env.DB_NAME;

mongoose
  .connect(`mongodb://127.0.0.1/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log(`We have connection to the ${process.env.DB_NAME}`))
  .catch((err) =>
    console.log(
      `Uh oh, we have a problem connecting to the ${process.env.DB_NAME}`,
      err
    )
  );
