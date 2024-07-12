const express = require("express");
const app = express();
const cors = require("cors"); // Import CORS

// Use CORS middleware
app.use(cors());
const connectDB = require("./database");
connectDB();

const userroute = require("./userroute");

app.use(express.json());

app.use("/api", userroute);

app.listen(5001, () => {
  console.log("listening on port 5001");
});
