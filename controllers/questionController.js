


// controllers/questionController.js
import Question from "../models/Question.js";
import Option from "../models/Option.js";

export const createQuestion = async (req, res) => {
  try {
    const question = new Question({ title: req.body.title });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addOption = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const option = new Option({
      text: req.body.text,
      question: question._id
    });
    await option.save();

    question.options.push(option);
    await question.save();

    res.status(201).json(option);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("options");
    if (!question) return res.status(404).json({ message: "Question not found" });

    const hasVotes = question.options.some(opt => opt.votes > 0);
    if (hasVotes) return res.status(400).json({ message: "Can't delete question with votes" });

    await Option.deleteMany({ question: question._id });
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("options");
    if (!question) return res.status(404).json({ message: "Question not found" });

    const formatted = {
      id: question._id,
      title: question.title,
      options: question.options.map(opt => ({
        id: opt._id,
        text: opt.text,
        votes: opt.votes,
        link_to_vote: `http://localhost:8000/options/${opt._id}/add_vote`
      }))
    };

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
