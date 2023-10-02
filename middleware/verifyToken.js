const UserCandidate = require("../models/userCadidateModel");
const UserCompany = require("../models/userCompanyModel");
const jwt = require("jsonwebtoken");

const verityToken = (req, res, next) =>{
    const authHeader = req.headers.token;

    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SEC, async (err, user)=>{
            if(err) res.status(403).json("Invalid token");

            req.user = user;

            next();
        })
    }else{
        return res.status(401).json("Not authenticated");
    }
}


module.exports = {verityToken, };
