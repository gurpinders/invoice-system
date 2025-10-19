import express from "express";
import connectDB from "./config/db.js";
import invoiceRoutes from "./routes/invoiceRoutes.js"

const app = express();
const port = 3001;

connectDB();

app.use(express.json());
app.use("/api/invoices", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`);
});
