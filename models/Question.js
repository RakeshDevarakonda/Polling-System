// models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "Option" }]
});

export default mongoose.model("Question", questionSchema);
