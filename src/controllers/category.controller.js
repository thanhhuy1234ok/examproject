const categoryService = require('../services/category.service')


const getAllListCategory = async (req, res) => {
    try {
        const dataListCategory = await categoryService.listCategory()

        return res.status(201).json({
            message: 'List Data Category',
            data: dataListCategory
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

const createCategory = async (req, res) => {
    const dataCategory = req.body
    try {
        const category = await categoryService.createCategory(dataCategory)
        return res.status(201).json({
            message: "create category success",
            data: category
        })
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }
}

const detailCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = await categoryService.detailCategory(id)
        return res.status(201).json({
            message: "detail category success",
            data: category
        })
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }
}

const updateCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedCategory = await categoryService.updateCategory(id, req.body);
        res.status(200).send(updatedCategory);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCategory = await categoryService.deleteCategory(id);
        res.status(200).send(deletedCategory);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
module.exports = {
    getAllListCategory, createCategory, detailCategory, updateCategory, deleteCategory
}