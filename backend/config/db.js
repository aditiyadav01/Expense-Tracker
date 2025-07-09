const mongoose = require("mongoose");

const connectdB = async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{});
        console.log(`MongoDB connected: `);
    } catch (error) {
        console.error("Error connecting to MongoDB",error);
        process.exit(1);
    }
};

module.exports = connectdB;