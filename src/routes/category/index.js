const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category.controller')
const { authenticateJWT, checkAdminRole, checkUserRole } = require('../../middleware/JWT');

/**
 * @swagger
 * /category/list-category:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục
 *     tags: [Danh mục]
 *     responses:
 *       200:
 *         description: Danh sách tất cả danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Điện thoại
 *                   description:
 *                     type: string
 *                     example: Danh mục điện thoại
 */

/**
 * @swagger
 * /category/create-category:
 *   post:
 *     summary: Tạo danh mục mới
 *     tags: [Danh mục]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Điện thoại
 *               description:
 *                 type: string
 *                 example: Danh mục điện thoại
 *     responses:
 *       201:
 *         description: Danh mục đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Danh mục đã được tạo thành công
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Điện thoại
 *                     description:
 *                       type: string
 *                       example: Danh mục điện thoại
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dữ liệu đầu vào không hợp lệ
 */

/**
 * @swagger
 * /category/detail-category/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của danh mục
 *     tags: [Danh mục]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của danh mục cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Điện thoại
 *                 description:
 *                   type: string
 *                   example: Danh mục điện thoại
 *       404:
 *         description: Danh mục không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Danh mục không tìm thấy
 */

/**
 * @swagger
 * /category/update-category/{id}:
 *   patch:
 *     summary: Cập nhật thông tin danh mục
 *     tags: [Danh mục]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của danh mục cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Điện thoại
 *               description:
 *                 type: string
 *                 example: Danh mục điện thoại
 *     responses:
 *       200:
 *         description: Cập nhật thông tin danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cập nhật danh mục thành công
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Điện thoại
 *                     description:
 *                       type: string
 *                       example: Danh mục điện thoại
 *       404:
 *         description: Danh mục không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Danh mục không tìm thấy
 */

/**
 * @swagger
 * /category/delete-category/{id}:
 *   delete:
 *     summary: Xóa danh mục
 *     tags: [Danh mục]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của danh mục cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Xóa danh mục thành công
 *       404:
 *         description: Danh mục không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Danh mục không tìm thấy
 */


router.get('/list-category', categoryController.getAllListCategory)
router.post('/create-category', categoryController.createCategory)
router.get('/detail-category/:id', categoryController.detailCategory)
router.patch('/update-category/:id', categoryController.updateCategory)
router.delete('/delete-category/:id', categoryController.deleteCategory)



module.exports = router