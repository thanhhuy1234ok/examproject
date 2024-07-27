const express = require('express');
const router = express.Router();
const invoiceController = require('../../controllers/invoice.controller')
const { authenticateJWT, checkAdminRole, checkUserRole } = require('../../middleware/JWT');
/**
 * @swagger
 * /invoices/list-invoice:
 *   get:
 *     summary: Lấy danh sách tất cả hóa đơn
 *     tags: [Hóa đơn]
 *     responses:
 *       200:
 *         description: Danh sách tất cả hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 60f8d8f8f8d8f8f8f8d8f8
 *                   customer:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
 *                       phone:
 *                         type: string
 *                         example: 1234567890
 *                       address:
 *                         type: string
 *                         example: 123 Main St
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product:
 *                           type: string
 *                           example: 60f8d8f8f8d8f8f8f8d8f8
 *                         productName:
 *                           type: string
 *                           example: Sản phẩm A
 *                         quantity:
 *                           type: number
 *                           example: 2
 *                         price:
 *                           type: number
 *                           example: 50.00
 *                         total:
 *                           type: number
 *                           example: 100.00
 *                   totalAmount:
 *                     type: number
 *                     example: 100.00
 *                   status:
 *                     type: string
 *                     example: pending
 *                   notes:
 *                     type: string
 *                     example: Ghi chú về hóa đơn
 */

/**
 * @swagger
 * /invoices/create-invoice:
 *   post:
 *     summary: Tạo hóa đơn mới
 *     tags: [Hóa đơn]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   phone:
 *                     type: string
 *                     example: 1234567890
 *                   address:
 *                     type: string
 *                     example: 123 Main St
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: 60f8d8f8f8d8f8f8f8d8f8
 *                     productName:
 *                       type: string
 *                       example: Sản phẩm A
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 50.00
 *                     total:
 *                       type: number
 *                       example: 100.00
 *               totalAmount:
 *                 type: number
 *                 example: 100.00
 *               status:
 *                 type: string
 *                 example: pending
 *               notes:
 *                 type: string
 *                 example: Ghi chú về hóa đơn
 *     responses:
 *       201:
 *         description: Hóa đơn đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn đã được tạo thành công
 *                 invoice:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60f8d8f8f8d8f8f8f8d8f8
 *                     customer:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: john.doe@example.com
 *                         phone:
 *                           type: string
 *                           example: 1234567890
 *                         address:
 *                           type: string
 *                           example: 123 Main St
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                             example: 60f8d8f8f8d8f8f8f8d8f8
 *                           productName:
 *                             type: string
 *                             example: Sản phẩm A
 *                           quantity:
 *                             type: number
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 50.00
 *                           total:
 *                             type: number
 *                             example: 100.00
 *                     totalAmount:
 *                       type: number
 *                       example: 100.00
 *                     status:
 *                       type: string
 *                       example: pending
 *                     notes:
 *                       type: string
 *                       example: Ghi chú về hóa đơn
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
 * /invoices/detail-invoice/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của hóa đơn
 *     tags: [Hóa đơn]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của hóa đơn cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60f8d8f8f8d8f8f8f8d8f8
 *                 customer:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     phone:
 *                       type: string
 *                       example: 1234567890
 *                     address:
 *                       type: string
 *                       example: 123 Main St
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                         example: 60f8d8f8f8d8f8f8f8d8f8
 *                       productName:
 *                         type: string
 *                         example: Sản phẩm A
 *                       quantity:
 *                         type: number
 *                         example: 2
 *                       price:
 *                         type: number
 *                         example: 50.00
 *                       total:
 *                         type: number
 *                         example: 100.00
 *                 totalAmount:
 *                   type: number
 *                   example: 100.00
 *                 status:
 *                   type: string
 *                   example: pending
 *                 notes:
 *                   type: string
 *                   example: Ghi chú về hóa đơn
 *       404:
 *         description: Hóa đơn không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn không tìm thấy
 */

/**
 * @swagger
 * /invoices/update-invoice/{id}:
 *   patch:
 *     summary: Cập nhật thông tin hóa đơn
 *     tags: [Hóa đơn]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của hóa đơn cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   phone:
 *                     type: string
 *                     example: 1234567890
 *                   address:
 *                     type: string
 *                     example: 123 Main St
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: 60f8d8f8f8d8f8f8f8d8f8
 *                     productName:
 *                       type: string
 *                       example: Sản phẩm A
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 50.00
 *                     total:
 *                       type: number
 *                       example: 100.00
 *               totalAmount:
 *                 type: number
 *                 example: 100.00
 *               status:
 *                 type: string
 *                 example: paid
 *               notes:
 *                 type: string
 *                 example: Cập nhật ghi chú
 *     responses:
 *       200:
 *         description: Cập nhật thông tin hóa đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cập nhật hóa đơn thành công
 *                 invoice:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60f8d8f8f8d8f8f8f8d8f8
 *                     customer:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: john.doe@example.com
 *                         phone:
 *                           type: string
 *                           example: 1234567890
 *                         address:
 *                           type: string
 *                           example: 123 Main St
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                             example: 60f8d8f8f8d8f8f8f8d8f8
 *                           productName:
 *                             type: string
 *                             example: Sản phẩm A
 *                           quantity:
 *                             type: number
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 50.00
 *                           total:
 *                             type: number
 *                             example: 100.00
 *                     totalAmount:
 *                       type: number
 *                       example: 100.00
 *                     status:
 *                       type: string
 *                       example: paid
 *                     notes:
 *                       type: string
 *                       example: Cập nhật ghi chú
 *       404:
 *         description: Hóa đơn không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn không tìm thấy
 */

/**
 * @swagger
 * /invoices/delete-invoice/{id}:
 *   delete:
 *     summary: Xóa hóa đơn
 *     tags: [Hóa đơn]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của hóa đơn cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa hóa đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Xóa hóa đơn thành công
 *       404:
 *         description: Hóa đơn không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn không tìm thấy
 */

router.get('/list-invoice', invoiceController.getAllListInvoice)
router.post('/create-invoice', invoiceController.createInvoice)
router.get('/detail-invoice/:id', invoiceController.getInvoiceById)
router.patch('/update-invoice/:id', invoiceController.updateInvoice)
router.delete('/delete-invoice/:id', invoiceController.deleteInvoiceById)


module.exports = router