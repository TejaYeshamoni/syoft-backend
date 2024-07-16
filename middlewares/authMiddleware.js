const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(400).send("Token not provided");

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).send("Invalid token");

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).send("Access denied");
      }

      req.user = decoded;
      next();
    });
  };
};
