const loginRegisterService = require('../services/loginRegister.service')

const login = async (req, res) => {
    try {
        const rawData = req.body
        const { user, accessToken, refreshToken } = await loginRegisterService.loginUser(rawData);
        res.status(200).json({
            access_token: accessToken,
            refresh_token: refreshToken,
            data: user,
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

const register = async (req, res) => {
    try {
        const rawData = req.body;
        const result = await loginRegisterService.registerUser(rawData);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        const { user, accessToken, refreshToken } = result;

        res.status(201).json({
            data: user,
            access_token: accessToken,
            refresh_token: refreshToken
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};


module.exports = {
    login, register
}