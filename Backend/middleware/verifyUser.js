const jwt = require("jsonwebtoken");

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token not provided" });
    }
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        throw err;
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token is invalid or expired" });
  }
};

module.exports = verifyUser ;
