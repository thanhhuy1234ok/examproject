const jwt = require('jsonwebtoken')
require('dotenv').config()

const createJWT = (payload, secret, expiresIn) => {
    let token = null;
    try {
        token = jwt.sign(payload, secret, { expiresIn });
    } catch (err) {
        console.error('Error creating JWT:', err);
    }
    return token;
}

const nonSecurePaths = ['/auth/login'];
// const nonSecurePaths = ['/logout', '/login', '/register'];


const createAccessToken = (user) => {
    const payload = { id: user._id, email: user.email, name: user.name, role: user.role };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;
    return createJWT(payload, secret, expiresIn);
};

const createRefreshToken = (user) => {
    const payload = { id: user._id, email: user.email, name: user.name, role: user.role };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
    return createJWT(payload, secret, expiresIn);
};

const verifyJWT = (token) => {
    let key = process.env.ACCESS_TOKEN_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err)
    }
    return decoded;
}


const extractToken = (req) => {
    // In ra header để kiểm tra
    console.log(req.headers);

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return null;
    }

    const token = authHeader.split(' ')[1];

    // Trả về token nếu có, hoặc null nếu không có
    return token || null;
};

// Middleware để xác thực JWT
const authenticateJWT = (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).send({ message: 'Access Denied. No Token Provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // Lưu thông tin người dùng vào req.user
        next(); // Tiếp tục với middleware tiếp theo
    } catch (error) {
        // Nếu token không hợp lệ
        res.status(401).send({ message: 'Invalid Token' });
    }
};
// Middleware kiểm tra quyền admin
const checkAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Nếu người dùng là admin, cho phép tiếp tục
    } else {
        res.status(403).send({ message: 'Forbidden. You do not have the required role.' });
    }
};

// Middleware kiểm tra quyền user
const checkUserRole = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next(); // Nếu người dùng là user, cho phép tiếp tục
    } else {
        res.status(403).send({ message: 'Forbidden. You do not have the required role.' });
    }
};

module.exports = {
    createJWT, verifyJWT, createRefreshToken, createAccessToken, authenticateJWT, checkAdminRole, checkUserRole
}