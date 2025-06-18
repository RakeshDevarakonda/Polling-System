// models/Option.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }
});

export default mongoose.model("Option", optionSchema);