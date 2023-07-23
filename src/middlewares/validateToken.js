import Jwt, { decode } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token, Authorization denied' })
    Jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = user;
    })
    next()
}