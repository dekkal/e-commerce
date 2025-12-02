const jwt = require("jsonwebtoken");

// const verifyUser = (req, res, next) => {
//   const token = req.headers["x-auth-token"];
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }
//     req.user = decoded;
//     if (decoded.id !== req.params.id) {
//       return res.status(403).json({ message: "you are not allowed" });
//     } else {
//       next();
//     }
//   });
// };
const verifyUser = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; 
    next();
  });
};

// const verifyAdmin = (req, res, next) => {
//   const token = req.headers["x-auth-token"];
//   try {
//     !token && res.status(400).json({ message: "NO TOKEN PROVIDED" });

//     jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//       if (err) return res.status(500).json("No token OR Server error");
//       req.user = decoded;
//       if (decoded.role === "admin") {
//         next();
//       } else {
//         return res.status(403).json({ message: "You are not allowed" });
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: "You are not authenticated" });
//   }
// };

const verifyAdmin = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(400).json({ message: "NO TOKEN PROVIDED" }); 
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "You are not allowed" });
    }

    req.user = decoded;
    next();
  });
};




module.exports = { verifyUser, verifyAdmin };
