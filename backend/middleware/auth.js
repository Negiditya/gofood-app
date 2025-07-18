const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET


const verifyToken = (req, res, next) => {

    const token = req.header("auth-token")


    if (!token) {
        res.status
        return res.status(401).json({ error: 'Access Denied. No token provided.' });
    }

    try {
        const userId = jwt.verify(token, secret)
        req.userId = userId.id
        next()

    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' });

    }



}

module.exports = verifyToken