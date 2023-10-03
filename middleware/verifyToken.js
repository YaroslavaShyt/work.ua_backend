const UserCandidate = require("../models/userCadidateModel");
const UserCompany = require("../models/userCompanyModel");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        console.log("in error");
        console.log(err);
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
      res.status(403).json("Error!");
    }
  });
};

module.exports = { verifyToken, verifyAndAuthorization };
