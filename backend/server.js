const express= require("express");
const connectDB = require("./config/db");
const app= express();
require("dotenv").config();


app.use(express.json());
app.use(express.static("public"));
const cors = require("cors");
// app.use(cors({ origin: "http://localhost:5174" }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "x-auth-token"],
  })
);



const port = process.env.PORT || 3000;
connectDB();
app.use("/api/v1/user", require("./Routes/user.route"));
app.use("/api/v1", require("./Routes/Products.route"));
app.use("/api/v1/auth", require("./Routes/auth.route"));
app.use("/api/v1/cart", require("./Routes/Cart.route"));


app.listen(port,()=>{
console.log(`server is runing on port http://localhost:${port}`);

})











