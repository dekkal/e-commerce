const Products= require ("./../models/products.model");



//Create New product
const createProduct = async (req, res) => {
  const { name, price, description, category, imgUrl, sold, rating ,createdAt} = req.body;

  try {
    const newProduct = new Products({ name, price, description, category, imgUrl, sold, rating,createdAt });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


  // Get all products
const getallproducts=async (req,res)=>{
try{
const allproducts= await Products.find();
res.status(200).json(allproducts);
}catch(err)
{
res.status(500).json({message:err.message});


};
}

const filterProduct = async (req, res) => {
  try {
    const { date, category, price } = req.query;

  
    const query = {};

    if (category) {
      query.category = { $regex: category, $options: "i" }; 
    }

    if (price) {
      query.price = { $lte: Number(price) }; 
    }

    if (date) {
      query.createdAt = { $gte: new Date(date) }; 
    }

    const data = await Products.find(query);

    res.status(200).send({ success: true, data });
  } catch (err) {
   
    res.status(500).send({ success: false, error: "Internal server error" });
  }
};




// DELETE /api/v1/products/:id
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleted = await Products.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json({ message: "Produit supprimé avec succès", deleted });
  } catch (error) {
    console.error("Erreur suppression produit :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};



module.exports={

    createProduct,
    getallproducts,
    filterProduct,
    deleteProduct
}