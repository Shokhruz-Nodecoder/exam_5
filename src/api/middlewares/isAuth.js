const jwt = require("../../libs/jwt");
const cookie = require("cookie-parser");


const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(403).json({message: 'Invalid token'});

    const verify = jwt.verify(token);

    req.user = verify;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({message : error.message});
  }
};

module.exports = isAuth;
