// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import questionRoutes from "./routes/questionRoutes.js";
import optionRoutes from "./routes/optionRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/questions", questionRoutes);
app.use("/options", optionRoutes);

app.listen(8000, () => console.log("Server started on port 8000"));
