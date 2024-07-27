const productModel = require('../model/product.model')
const path = require('path');
const fs = require('fs')
const paginate = require('../helper/paginate')
const dataListProduct = () => {
    return productModel.find()
}

const createProduct = async (productData, files) => {
    try {
        let images = [];
        if (files && files.length > 0) {
            images = [path.join(files[0].filename)];
        }
        console.log(images)

        const newProductData = {
            ...productData,
            image: images,
        };
        const newProduct = new productModel(newProductData);
        return await newProduct.save();
    } catch (error) {
        console.error('Error in productService.createProduct:', error);
        throw error;
    }
};

const getDetailProduct = async (id) => {
    try {
        const dataDetailProduct = await productModel.findById(id)
        return dataDetailProduct
    } catch (error) {
        throw error;
    }
}

const updateProduct = async (id, productData, files, isMultiple) => {
    try {
        // const baseImageUrl = '/public/img/';
        let images = [];
        if (isMultiple === 'true') {
            images = files ? files.map(file => path.join(file.filename)) : [];
        } else {
            if (files && files.length > 0) {
                images = [path.join(files[0].filename)];
            }
        }
        const newProductData = {
            ...productData,
            image: images,
        };
        const newProduct = await productModel.findByIdAndUpdate(id, newProductData, { new: true })
        return newProduct;
    } catch (error) {
        console.error('Error in productService.updateProduct:', error);
        throw error;
    }
}

const deleteProduct = async (id) => {
    try {
        await productModel.findByIdAndDelete(id)
        return 'Product Delete success '
    } catch (error) {
        throw error;
    }
}

const deleteProductImages = async (images) => {
    if (images && images.length > 0) {
        images.forEach(imagePath => {
            console.log(imagePath)
            const fullPath = path.join(__dirname, '..', imagePath);
            console.log(fullPath)
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        });
    }
};

const getFindAllProductPagination = async (current, pageSize) => {
    const { listPagination, totalItem } = await paginate.getPagination(productModel, current, pageSize)
    return { listData: listPagination, totalItem: totalItem };
};

const searchProducts = async (name, minPrice, maxPrice) => {
    let filter = {};
    if (name) {
        filter.name = { $regex: new RegExp(name, 'i') };
    }
    if (minPrice) filter.price = { $gte: Number(minPrice) };
    if (maxPrice) {
        if (!filter.price) filter.price = {};
        filter.price.$lte = Number(maxPrice);
    }

    return await productModel.find(filter).sort({ postedDate: -1 });
};

module.exports = {
    dataListProduct,
    createProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
    deleteProductImages,
    getFindAllProductPagination,
    searchProducts
}