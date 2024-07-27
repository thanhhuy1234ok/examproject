const categoryModel = require('../model/category.model')

const listCategory = async () => {
    const dataCategory = await categoryModel.find();
    return dataCategory
}

const createCategory = async (dataCategory) => {
    try {
        const category = await categoryModel.create({ ...dataCategory });
        return category;
    } catch (error) {
        throw new Error('Error creating category: ' + error.message);
    }
}

const detailCategory = async (id) => {
    const category = await categoryModel.findById(id)
    return category

}
const updateCategory = async (id, dataCategory) => {
    try {
        const category = await categoryModel.findByIdAndUpdate(id, dataCategory, { new: true });
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    } catch (error) {
        throw new Error('Error updating category: ' + error.message);
    }
};
const deleteCategory = async (id) => {
    try {
        const category = await categoryModel.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        if (!category.sub_category) {
            await categoryModel.deleteMany({ sub_category: category._id });
        }
        await categoryModel.findByIdAndDelete(id);
        return category;
    } catch (error) {
        throw new Error('Error deleting category: ' + error.message);
    }
};

module.exports = {
    listCategory, createCategory, detailCategory, updateCategory, deleteCategory
}