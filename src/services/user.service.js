const userModel = require("../model/user.model");
const { hashUserPassword, isValidEmail } = require('../helper/bcrypt')
const paginate = require('../helper/paginate')



const getFindAllUser = async () => {
    return await userModel.find()
}

const createUserFromAdmin = async (dataInputUser) => {
    const { username, password, email, roles, profile } = dataInputUser;

    if (!isValidEmail(email)) {
        throw new Error('Invalid email address');
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await hashUserPassword(password);

        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            email,
            roles,
            profile: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                age: profile.age,
                address: profile.address
            }
        });

        return newUser;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

const updateUser = (id, updateUserData) => {
    return userModel.findByIdAndUpdate(id, updateUserData, { new: true })
}

const getDetailUser = (id) => {
    return userModel.findById(id)
}

const deleteUser = async (id) => {
    const checkUser = await userModel.findById({ _id: id });
    if (!checkUser) throw new Error('User not found');

    const result = await userModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) throw new Error('Failed to delete user');

    return 'User deleted successfully';
};

const getFindAllUserPagination = async (current, pageSize) => {
    const { listPagination, totalItem } = await paginate.getPagination(userModel, current, pageSize)
    return { listData: listPagination, totalUser: totalItem };
};




module.exports = {
    getFindAllUser, createUserFromAdmin,
    updateUser,
    getDetailUser, deleteUser,
    getFindAllUserPagination,
}