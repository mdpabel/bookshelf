const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/book");
const error = require("./middleware/error");
const cors = require("cors");
require("dotenv").config();

const app = express();

// DB Connection
require("./db/mongoose");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);

app.use(error);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`The server is running on PORT ${PORT}`));
