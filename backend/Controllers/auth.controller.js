const User = require("./../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const exsitingUser = await User.findOne({ email });

//     exsitingUser && res.status(400).json({ message: "User already exists" });

//     const hashedPassword = CryptoJS.AES.encrypt(
//       password,
//       process.env.PASSWORD_SECRET_KEY
//     ).toString();

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });
//     console.log(newUser);
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    ).toString();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role , // <--- IMPORTANT
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    !user && res.status(404).json({ message: "User not found" });

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (password !== decryptedPassword) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET);

    const result = {
      ...user._doc,
      token: accessToken,
    };

    res.status(200).json({
      message: "Login successful",
      result,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};


//  const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const valid = await bcrypt.compare(req.body.password, user.password);
//     if (!valid) return res.status(400).json({ message: "Wrong password" });

//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//         role: user.role, // <--- IMPORTANT
//       },
//       process.env.TOKEN_SECRET
//     );

//     res.status(200).json({
//       message: "Logged in",
//       result: {
//         _id: user._id,
//         email: user.email,
//         role: user.role,          // ← Doit apparaître ici
//         token: token,             // ← Et ici
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



module.exports = { register, login };
