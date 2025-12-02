const mongoose=require("mongoose");


const connectDB= async()=>{

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfuly");
    }catch(err){
        console.err("MongoDB connection failed",err.message);
        process.exit(1);
    }
    
};


module.exports = connectDB;