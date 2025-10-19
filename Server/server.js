import express from "express";
import connectDB from "./config/db.js";

const app = express();
const port = 3001;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`);
});
