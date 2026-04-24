require("dotenv").config();

const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});