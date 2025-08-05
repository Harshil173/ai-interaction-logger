require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");
const interactionRoutes = require("./routes/interactionRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use("/api", interactionRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
}

module.exports = app; 