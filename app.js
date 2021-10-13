const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

//start database and app
const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(port, () => {
      console.log(`The server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
