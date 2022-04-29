require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/private", require("./routes/private"));
// app.use("/api/product", require("./routes/product"));
// app.use("/api/user", require("./routes/user"));
// app.use("/api/comment", require("./routes/comment"));
// app.use("/api/cart", require("./routes/cart"));
// app.use("/api/checkout", require("./routes/checkout"));
// app.use("/api/order", require("./routes/order"));
// app.use("/api/homepage", require("./routes/homepage"));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});