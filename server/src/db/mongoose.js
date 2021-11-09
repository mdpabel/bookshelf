const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then((res) => console.log(`DB connected`))
  .catch((err) => console.log("ERROR", err));
