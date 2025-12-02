    
const { createProduct,getallproducts,filterProduct,deleteProduct }=require("./../Controllers/Products.controler");
const router= require("express").Router();
const { verifyUser,verifyAdmin } = require("../middlewares/token");

router.post("/addProducts",verifyAdmin,createProduct);
router.get('/all',getallproducts);
router.get("/filterpro",filterProduct);
router.delete("/products/:id",verifyAdmin, deleteProduct);





module.exports=router;

    



