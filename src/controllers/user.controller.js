const userService = require('../services/user.service')

const listAllUser = async (req, res) => {
    const listData = await userService.getFindAllUser()

    return res.status(201).json({
        message: 'List Data User',
        Data: listData,
    })
}

const listUserPagination = async (req, res) => {
    let { current, pageSize } = req.query;
    current = parseInt(current, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;

    if (isNaN(current) || current < 1) {
        return res.status(400).json({ message: 'Invalid current number' });
    }

    if (isNaN(pageSize) || pageSize < 1) {
        return res.status(400).json({ message: 'Invalid pageSize number' });
    }

    try {
        const { listData, totalUser } = await userService.getFindAllUserPagination(current, pageSize);
        const totalPages = Math.ceil(totalUser / pageSize);

        return res.status(200).json({
            message: 'List Data User',
            data: listData,
            meta: {
                current,
                pageSize,
                totalPages,
                totalUser,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const createUserAdmin = async (req, res) => {
    const dataInputUser = req.body;
    try {
        const dataUser = await userService.createUserFromAdmin(dataInputUser);

        return res.status(201).json({
            message: 'Create User Success',
            data: dataUser,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const getDetailUser = async (req, res) => {
    const id = req.params.id;
    try {
        const detailUser = await userService.getDetailUser(id)
        return res.status(201).json({
            message: 'Detail User',
            data: detailUser,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
const updateUser = async (req, res) => {
    const id = req.params.id;
    const dataUpdateUser = req.body;

    try {
        const updateUser = await userService.updateUser(id, dataUpdateUser);
        return res.status(201).json({
            message: 'Update User Success',
            data: updateUser,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteUser = await userService.deleteUser(id);
        return res.status(201).json({
            message: deleteUser
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}



module.exports = {
    listAllUser, createUserAdmin, getDetailUser, updateUser, deleteUser, listUserPagination
}