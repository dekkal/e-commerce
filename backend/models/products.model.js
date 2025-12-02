const mongoose=require("mongoose");


const productsSchema= new mongoose.Schema(

{
    name:{

        type:String,
        required:true,

    },
    price:{
   type:Number,
   required:true,

    },

    description:{

        type: String,

    },
    category:{
        type:String,
        required:true,
    },

    imgUrl:{
        type:String,
    
    },
       createdAt: { 
        type: Date, default: Date.now },
    
    
     sold:{
        type:Number,
        default:0
     },
     rating:{
         type:Number,
         required:true,
     }
},

{
    timestamps:true,
}
);

module.exports=mongoose.model("Product",productsSchema);

















