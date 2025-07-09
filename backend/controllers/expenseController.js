const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const Expense = require("../models/Expense.js");


// add expense source 
exports.addExpense = async(req,res)=>{
    const userId = req.user.id;

    try{
        const {icon,category,amount,date}=req.body;

       //validation check for missing fields

        if(!category || !amount || !date){
            return res.status(400).json({message: "all fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch(err){
        res.status(500)
        .json({message: "server error",error: err.message})
    }
}

// get all expense source 
exports.getAllExpense = async(req,res)=>{
    const userId=req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

// delete expense source 
exports.deleteExpense = async(req,res)=>{
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

//download excel
exports.downloadExpenseExcel = async (req, res) =>
{
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // clean date format
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Path where the file will be saved temporarily
    const filePath = path.join(__dirname, "../uploads/expense_details.xlsx");

    // Write file to disk
    xlsx.writeFile(wb, filePath);

    // Send the file as a download
    res.download(filePath, "expense_details.xlsx", (err) => {
      if (err) {
        console.error("Download failed:", err);
        res.status(500).json({ message: "Download failed" });
      }

      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
