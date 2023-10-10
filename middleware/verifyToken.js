const UserCandidate = require("../models/userCadidateModel");
const UserCompany = require("../models/userCompanyModel");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        console.log('in jwt');
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
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json({});
    }
  });
};

module.exports = { verifyToken, verifyAndAuthorization };
