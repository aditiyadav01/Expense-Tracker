const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const moment = require("moment");

// GET user's current budget (optionally with ?month=YYYY-MM)
router.get("/", protect, async (req, res) => {
  try {
    const user = req.user;
    const now = moment();
    const month = req.query.month || now.format("YYYY-MM");

    const budgets =
      user.budgets instanceof Map
        ? Object.fromEntries(user.budgets)
        : user.budgets || {};

    const budget = budgets[month] || 0;

    // Build budget history (optional UI use)
    const history = Object.entries(budgets).map(([m, b]) => ({
      month: moment(m, "YYYY-MM").format("MMMM YYYY"),
      budget: b,
      spent: 0, // You can replace with actual expense sum
      remaining: b - 0,
    }));

    return res.json({ budget, history });
  } catch (err) {
    console.error("Budget GET Error:", err);
    res.status(500).json({ message: "Error getting budget" });
  }
});

// PUT update current month's budget
router.put("/", protect, async (req, res) => {
  try {
    const { budget } = req.body;

    if (typeof budget !== "number" || budget < 0) {
      return res.status(400).json({ message: "Invalid budget value" });
    }

    const user = req.user;
    const currentMonth = moment().format("YYYY-MM");

    // Update or create the entry
    if (user.budgets instanceof Map) {
      user.budgets.set(currentMonth, budget);
    } else {
      user.budgets = {
        ...(user.budgets || {}),
        [currentMonth]: budget,
      };
    }

    await user.save();

    res.json({ message: "Budget updated successfully!" });
  } catch (err) {
    console.error("Budget Update Error:", err);
    res.status(500).json({ message: "Error updating budget" });
  }
});

// (Optional) GET monthly budget history

router.get("/history", protect, async (req, res) => {
  try {
    const user = req.user;
    const userId = req.user._id;

    // Convert Map to object if needed
    const budgets =
      user.budgets instanceof Map
        ? Object.fromEntries(user.budgets)
        : user.budgets || {};

    // Fetch all expenses for this user
    const allExpenses = await Expense.find({ userId });

    const expensesByMonth = {};

    allExpenses.forEach((txn) => {
      const month = moment(txn.date).format("YYYY-MM");
      expensesByMonth[month] = (expensesByMonth[month] || 0) + txn.amount;
    });

    const history = Object.entries(budgets).map(([month, budgetAmount]) => {
      const spent = expensesByMonth[month] || 0;
      const remaining = budgetAmount - spent;

      return {
        month,
        budget: budgetAmount,
        spent,
        remaining,
      };
    });

    return res.json({ history });
  } catch (err) {
    console.error("Error in GET /budget/history", err);
    res.status(500).json({ message: "Error fetching budget history" });
  }
});

module.exports = router;
