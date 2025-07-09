const User = require("../models/User.js");
const Income = require("../models/Income.js");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");


// add income source 
exports.addIncome = async(req,res)=>{
  
    const userId = req.user.id;
    try{
        const {icon,source,amount,date}=req.body;

       //validation check for missing fields

        if(!source || !amount || !date){
            return res.status(400).json({message: "all fields are required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch(err){
        res.status(500)
        .json({message: "server error",error: err.message})
    }
}

// get all income source 
exports.getAllIncome = async(req,res)=>{
    const userId=req.user.id;
    try {
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

// delete income source 
exports.deleteIncome = async(req,res)=>{
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

//download excel
exports.downloadIncomeExcel = async (req, res) =>
{
  const userId=req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // clean date format
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Path where the file will be saved temporarily
    const filePath = path.join(__dirname, "../uploads/income_details.xlsx");

    // Write file to disk
    xlsx.writeFile(wb, filePath);

    // Send the file as a download
    res.download(filePath, "income_details.xlsx", (err) => {
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
