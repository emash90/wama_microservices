const userService = require('../services/userService')

const getAllUsers = async(req, res, next) => {
    try {
        const allUsers = await userService.getAllUsers()
        res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        console.log("body ==>", req.body)
        const { email, password } = req.body;
        // Find user by email
        const user = await userService.findOne(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isMatch = await userService.checkPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await userService.generateToken(user);
        // Respond with user data
        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            token: token,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
}

const createUser = async(req, res, next) => {
    
    try {
        // Check if user already exists by email
        const existingUser = await userService.findOne(req.body.email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Save the new user
        const user = await userService.createUser(req.body);

        const token = await userService.generateToken(user);

        // Exclude password from the response
        const { password: _, ...userData } = user._doc;

        res.status(201).json({...userData, token})
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const _id = req.params.id
        const user = await userService.getUserById(_id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const authenticateUser = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                isValid: false,
                message: 'Token is required.',
            });
        }

        const decodedUser = await userService.checkToken(token);
        if (decodedUser.message && decodedUser.message.includes('Invalid or expired token')) {
            return res.status(403).json({
                isValid: false,
                message: 'Invalid or expired token.',
            });
        }

        return res.status(200).json({
            isValid: true,
            data: decodedUser,
        });
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({
            isValid: false,
            message: 'An error occurred while processing your request.',
        });
    }
};


module.exports = {
    getAllUsers,
    createUser,
    login,
    getUserById,
    authenticateUser
}