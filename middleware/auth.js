const jwt = require("jsonwebtoken");
const Admin = require("../db/models/admin");
const keys = require("../config/keys");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.id;
    const decoded = jwt.verify(token, keys.signature);
    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!admin) {
      throw new Error();
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).send("Please login to access this page");
  }
};

module.exports = auth;
