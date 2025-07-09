const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/mongoDB.js");

const authRouter = require("./routes/authRouter.js");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
