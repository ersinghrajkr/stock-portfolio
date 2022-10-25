const jwt = require("jsonwebtoken");

module.exports = {
    authToken,
    isLoggedIn
}

// Authenticate Token
function authToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');

        // Get token from array
        const bearerToken = bearer[1];

        // Set the token
        req.token = bearerToken;

        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

async function isLoggedIn(req, res, next){
    try {
        // check if auth header exists
        if (req.headers.authorization) {
          // parse token from header
          const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
          if (token) {
            const payload = jwt.verify(token, process.env.SECRET);
            if (payload) {
              // store user data in request object
              req.user = payload;
              next();
            } else {
              res.status(400).json({ error: "Token Verification Failed" });
            }
          } else {
            res.status(400).json({ error: "Malformed Auth Header" });
          }
        } else {
          res.status(400).json({ error: "No Authorization Header" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
}
