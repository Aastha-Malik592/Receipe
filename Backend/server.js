require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend Working");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
