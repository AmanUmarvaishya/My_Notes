const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ msg: 'No token' });
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
