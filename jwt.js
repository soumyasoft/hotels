const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    // Authorization check

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token not found!!!' });

    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach the user information to the request object

        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid Token' });
    }
}

// Generate JWT token

const generateToken = (userData) => {
    // Generate a new JWT token using user data.
    return jwt.sign({userData}, process.env.JWT_SECRET, { expiresIn: 3000 });
}

module.exports = { jwtAuthMiddleware, generateToken };