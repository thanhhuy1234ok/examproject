const userModel = require('../model/user.model')
const { createAccessToken, createRefreshToken } = require('../middleware/JWT')
const { checkPassword, hashUserPassword, isValidEmail } = require('../helper/bcrypt')
const registerUser = async (rawData) => {
    try {
        const { email, password, username } = rawData;

        if (!email || !password || !username) {
            throw new Error('Username, email, and password are required');
        }


        if (!isValidEmail(email)) {
            throw new Error('Invalid email format');
        }


        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hashUserPassword(password);

        // Create a new user
        const newUser = new userModel({ username, email, password: hashedPassword });

        // Generate access and refresh tokens
        const accessToken = createAccessToken(newUser);
        const refreshToken = createRefreshToken(newUser);

        newUser.refresh_token = refreshToken;
        await newUser.save();

        return {
            user: {
                username: username,
                email: newUser.email,
                role: newUser.role
            }, accessToken, refreshToken
        };

    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
}

const loginUser = async (rawData) => {
    try {
        const { email, password } = rawData;

        // Find user by email and select the necessary fields
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Verify password
        const isPasswordValid = await checkPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const payload = {
            name: user.username,
            email: user.email,
            role: user.role
        }
        console.log(payload)
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(user);

        // Save refresh token in the user document
        user.refresh_token = refreshToken;
        await user.save();
        return {
            user: {
                name: user.username,
                email: user.email,
                role: user.role
            }, accessToken, refreshToken
        };
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

module.exports = {
    registerUser, loginUser
}