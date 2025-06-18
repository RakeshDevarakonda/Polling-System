
// routes/questionRoutes.js
import express from "express";
import {
  createQuestion,
  addOption,
  deleteQuestion,
  getQuestion
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/create", createQuestion);
router.post("/:id/options/create", addOption);
router.delete("/:id/delete", deleteQuestion);
router.get("/:id", getQuestion);

export default router;
