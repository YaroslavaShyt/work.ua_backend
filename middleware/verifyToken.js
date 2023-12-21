const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // верифікація токену, переданого в хедері
    jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        res.status(403).json(err);
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Not authenticated");
  }
};

const verifyAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    //console.log(`${req.user.id} - ${req.params.id}`);
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json({message: "verify and authorization method causes an error"});
    }
  });
};

module.exports = { verifyToken, verifyAndAuthorization };
