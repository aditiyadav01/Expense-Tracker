const express = require("express");
const router = express.Router();
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const {protect} = require ("../middleware/authMiddleware.js");// ensure user is authenticated


router.get("/", protect, async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId });
    const expense = await Expense.find({ userId });

    const transactions = [
      ...income.map(txn => ({ ...txn.toObject(), type: "income" })),
      ...expense.map(txn => ({ ...txn.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
