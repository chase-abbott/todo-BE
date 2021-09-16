const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
// #10 Adding User Authentication | Build a Complete App with GraphQL, Node.js, MongoDB and React.js
module.exports = function (req, res, next) {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next()
  }
  const token = authHeader.split(' ')[1].trim()

  if (!token || token === '') {
    req.isAuth = false;
    return next()
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (err) {
    req.isAuth = false;
    return next()
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next()
  }
  req.isAuth = true;
  req.userId = decodedToken.user._id
  next();
};