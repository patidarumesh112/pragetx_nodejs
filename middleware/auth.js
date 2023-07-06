const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    // Verify the token
    const decodedToken = jwt.verify(token, 'secretkey');

    // Attach the user ID to the request for further use
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticateUser;
