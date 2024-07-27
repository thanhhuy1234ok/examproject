const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller')
const { uploadMultiple } = require('../../configs/multerConfig');
const { authenticateJWT, checkAdminRole, checkUserRole } = require('../../middleware/JWT');

/**
 * @swagger
 * /products/list-product:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags: [Sản phẩm]
 *     responses:
 *       200:
 *         description: Danh sách tất cả sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 12345
 *                   name:
 *                     type: string
 *                     example: Sản phẩm A
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 100.50
 *                   description:
 *                     type: string
 *                     example: Mô tả sản phẩm A
 *                   imageUrl:
 *                     type: string
 *                     example: http://example.com/image.jpg
 */

/**
 * @swagger
 * /products/create-product:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Sản phẩm]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sản phẩm A
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 100.50
 *               quantity:
 *                 type: number
 *                 example: 100
 *               description:
 *                 type: string
 *                 example: Mô tả sản phẩm A
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               detail_product:
 *                 type: object
 *                 properties:
 *                   supplier:
 *                     type: string
 *                     example: Nhà cung cấp ABC
 *                   publisher:
 *                     type: string
 *                     example: Nhà xuất bản XYZ
 *                   cover_form:
 *                     type: string
 *                     example: Bìa mềm
 *                   author:
 *                     type: string
 *                     example: Tác giả 123
 *               categories:
 *                 type: string
 *                 example: 60f8d8f8f8d8f8f8f8d8f8
 *     responses:
 *       200:
 *         description: Sản phẩm đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sản phẩm đã được tạo thành công
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 12345
 *                     name:
 *                       type: string
 *                       example: Sản phẩm A
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 100.50
 *                     quantity:
 *                       type: number
 *                       example: 100
 *                     description:
 *                       type: string
 *                       example: Mô tả sản phẩm A
 *                     imageUrl:
 *                       type: string
 *                       example: http://example.com/image.jpg
 *                     detail_product:
 *                       type: object
 *                       properties:
 *                         supplier:
 *                           type: string
 *                           example: Nhà cung cấp ABC
 *                         publisher:
 *                           type: string
 *                           example: Nhà xuất bản XYZ
 *                         cover_form:
 *                           type: string
 *                           example: Bìa mềm
 *                         author:
 *                           type: string
 *                           example: Tác giả 123
 *                     categories:
 *                       type: string
 *                       example: 60f8d8f8f8d8f8f8f8d8f8
 *       400:
 *         description: Lỗi tải tệp lên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lỗi tải tệp lên
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Mô tả lỗi cụ thể
 */

/**
 * @swagger
 * /products/detail-product/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của sản phẩm
 *     tags: [Sản phẩm]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của sản phẩm cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   example: Sản phẩm A
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 100.50
 *                 description:
 *                   type: string
 *                   example: Mô tả sản phẩm A
 *                 imageUrl:
 *                   type: string
 *                   example: http://example.com/image.jpg
 *       404:
 *         description: Sản phẩm không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sản phẩm không tìm thấy
 */

/**
 * @swagger
 * /products/update-product/{id}:
 *   patch:
 *     summary: Cập nhật thông tin sản phẩm
 *     tags: [Sản phẩm]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của sản phẩm cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sản phẩm A
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 100.50
 *               description:
 *                 type: string
 *                 example: Mô tả sản phẩm A
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thông tin sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cập nhật sản phẩm thành công
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 12345
 *                     name:
 *                       type: string
 *                       example: Sản phẩm A
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 100.50
 *                     description:
 *                       type: string
 *                       example: Mô tả sản phẩm A
 *                     imageUrl:
 *                       type: string
 *                       example: http://example.com/image.jpg
 *       400:
 *         description: Lỗi tải tệp lên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lỗi tải tệp lên
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Mô tả lỗi cụ thể
 *       404:
 *         description: Sản phẩm không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sản phẩm không tìm thấy
 */

/**
 * @swagger
 * /products/delete-product/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Sản phẩm]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của sản phẩm cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Xóa sản phẩm thành công
 *       404:
 *         description: Sản phẩm không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sản phẩm không tìm thấy
 */

/**
 * @swagger
 * /products/list-paginate-product:
 *   get:
 *     summary: Danh sách sản phẩm với phân trang
 *     tags: [Sản phẩm]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Số trang (bắt đầu từ 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Số lượng sản phẩm trên mỗi trang
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm với phân trang
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 12345
 *                       name:
 *                         type: string
 *                         example: Sản phẩm A
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 100.50
 *                       description:
 *                         type: string
 *                         example: Mô tả sản phẩm A
 *                       imageUrl:
 *                         type: string
 *                         example: http://example.com/image.jpg
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalProducts:
 *                   type: integer
 *                   example: 50
 */

/**
 * @swagger
 * /products/search-product:
 *   get:
 *     summary: Search for products by name and price range
 *     tags: [Sản phẩm]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: The name of the product to search for
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: float
 *         required: false
 *         description: The minimum price for the search query
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: float
 *         required: false
 *         description: The maximum price for the search query
 *     responses:
 *       200:
 *         description: A list of products matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: data search price
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Sản phẩm A
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 100.50
 *                       quantity:
 *                         type: number
 *                         example: 100
 *                       description:
 *                         type: string
 *                         example: Mô tả sản phẩm A
 *                       imageUrl:
 *                         type: string
 *                         example: http://example.com/image.jpg
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */



router.get('/list-product', productController.getAllListProduct)

router.post('/create-product', authenticateJWT, checkAdminRole, async (req, res, next) => {
    uploadMultiple(req, res, (err) => {
        if (err) {
            console.error('Lỗi Multer:', err);
            return res.status(400).json({ message: 'Lỗi tải tệp lên', error: err });
        }
        // console.log('Files:', req.files);
        next();
    });
}, productController.createProduct)

router.get('/detail-product/:id', productController.detailProduct)


router.patch('/update-product/:id', authenticateJWT, checkAdminRole, async (req, res, next) => {
    uploadMultiple(req, res, (err) => {
        if (err) {
            console.error('Lỗi Multer:', err);
            return res.status(400).json({ message: 'Lỗi tải tệp lên', error: err });
        }
        console.log('Files:', req.files);
        next();
    });
}, productController.updateProduct)


router.delete('/delete-product/:id', authenticateJWT, checkAdminRole, productController.deleteProduct)

router.get('/list-paginate-product', productController.listProductPagination);

router.get('/search-product', productController.searchProduct);



module.exports = router