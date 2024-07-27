const productService = require('../services/product.service')



const getAllListProduct = async (req, res) => {
    try {
        const listProduct = await productService.dataListProduct()
        return res.status(201).json({
            message: 'List Data Product',
            Data: listProduct,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, price, quantity, description, detail_product } = req.body;
        const files = req.files
        const newProduct = await productService.createProduct(
            { name, price, quantity: quantity || 0, description, detail_product },
            files
        );
        res.status(201).json({
            message: 'Product created successfully',
            data: newProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const detailProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const detailProduct = await productService.getDetailProduct(id)
        return res.status(201).json({
            message: 'Detail product',
            data: detailProduct,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const { name, price, quantity, description, detail_product, isMultiple } = req.body
        const newProduct = await productService.updateProduct(
            id,
            { name, price, quantity: quantity || 0, description, detail_product },
            isMultiple === 'true' ? req.files : req.file ? [req.file] : [],
            isMultiple
        );
        return res.status(201).json({
            message: 'Product updated successfully',
            data: newProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productService.getDetailProduct(id);
        console.log(product)
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        await productService.deleteProductImages(product.image);
        await productService.deleteProduct(id);

        return res.status(201).json({
            message: 'xoa thanh cong'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

const listProductPagination = async (req, res) => {
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
        const { listData, totalItem } = await productService.getFindAllProductPagination(current, pageSize);
        const totalPages = Math.ceil(totalItem / pageSize);

        return res.status(200).json({
            message: 'List Data Product',
            data: listData,
            meta: {
                current,
                pageSize,
                totalPages,
                totalItem,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { name, minPrice, maxPrice } = req.query;

        const products = await productService.searchProducts(name, minPrice, maxPrice);

        res.status(200).json({
            message: "data search price",
            data: products
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllListProduct, createProduct,
    detailProduct, updateProduct,
    deleteProduct, listProductPagination,
    searchProduct
}