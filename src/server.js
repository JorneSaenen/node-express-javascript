// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController.js";
import testRoutes from "./routes/exampleRoutes.js";
import { helloMiddleware } from "./middleware/exampleMiddleware.js";
import mongoose from "mongoose";

// Variables
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = process.env;
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", helloMiddleware, testRoutes);
app.all("*", notFound);

// Database connection
try {
  await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
    user: DB_USER,
    pass: DB_PASS,
  });
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
