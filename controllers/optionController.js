
// controllers/optionController.js
import Option from "../models/Option.js";

export const deleteOption = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);
    if (!option) return res.status(404).json({ message: "Option not found" });

    if (option.votes > 0)
      return res.status(400).json({ message: "Can't delete option with votes" });

    await Option.findByIdAndDelete(req.params.id);
    res.json({ message: "Option deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addVote = async (req, res) => {
  try {
    const option = await Option.findById(req.params.id);
    if (!option) return res.status(404).json({ message: "Option not found" });

    option.votes += 1;
    await option.save();

    res.json({ message: "Vote added", votes: option.votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
