const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller')
const { authenticateJWT, checkAdminRole, checkUserRole } = require('../../middleware/JWT');
/**
 * @swagger
 * /users/list-user:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: john_doe
 *                   email:
 *                     type: string
 *                     example: john.doe@gmail.com
 *                   roles:
 *                     type: string
 *                     example: user
 *                   profile:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *                       age:
 *                         type: integer
 *                         example: 30
 *                       address:
 *                         type: string
 *                         example: 123 Main St
 */
router.get('/list-user', authenticateJWT, checkAdminRole, userController.listAllUser);



/**
 * @swagger
 * /users/create-user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: 123456789
 *               email:
 *                 type: string
 *                 example: john.doe@gmail.com
 *               roles:
 *                 type: string
 *                 example: user
 *               profile:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   age:
 *                     type: integer
 *                     example: 30
 *                   address:
 *                     type: string
 *                     example: 123 Main St
 *     responses:
 *       200:
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: john_doe
 *                     email:
 *                       type: string
 *                       example: john.doe@gmail.com
 *                     roles:
 *                       type: string
 *                       example: user
 *                     profile:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           example: John
 *                         lastName:
 *                           type: string
 *                           example: Doe
 *                         age:
 *                           type: integer
 *                           example: 30
 *                         address:
 *                           type: string
 *                           example: 123 Main St
 */
router.post('/create-user', authenticateJWT, checkAdminRole, userController.createUserAdmin);


/**
 * @swagger
 * /users/detail-user/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: john_doe
 *                 email:
 *                   type: string
 *                   example: john.doe@gmail.com
 *                 roles:
 *                   type: string
 *                   example: user
 *                 profile:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     address:
 *                       type: string
 *                       example: 123 Main St
 *       404:
 *         description: Người dùng không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Người dùng không tìm thấy
 */
router.get('/detail-user/:id', authenticateJWT, checkAdminRole, userController.getDetailUser);

/**
 * @swagger
 * /users/update-user/{id}:
 *   patch:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: 123456789
 *               email:
 *                 type: string
 *                 example: john.doe@gmail.com
 *               roles:
 *                 type: string
 *                 example: user
 *               profile:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   age:
 *                     type: integer
 *                     example: 30
 *                   address:
 *                     type: string
 *                     example: 123 Main St
 *     responses:
 *       200:
 *         description: Cập nhật thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cập nhật người dùng thành công
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: john_doe
 *                     email:
 *                       type: string
 *                       example: john.doe@gmail.com
 *                     roles:
 *                       type: string
 *                       example: user
 *                     profile:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           example: John
 *                         lastName:
 *                           type: string
 *                           example: Doe
 *                         age:
 *                           type: integer
 *                           example: 30
 *                         address:
 *                           type: string
 *                           example: 123 Main St
 *       404:
 *         description: Người dùng không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Người dùng không tìm thấy
 */
router.patch('/update-user/:id', authenticateJWT, checkAdminRole, userController.updateUser);

/**
 * @swagger
 * /users/delete-user/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Xóa người dùng thành công
 *       404:
 *         description: Người dùng không tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Người dùng không tìm thấy
 */
router.delete('/delete-user/:id', authenticateJWT, checkAdminRole, userController.deleteUser)


/**
 * @swagger
 * /users/list-paginate-user:
 *   get:
 *     summary: Danh sách người dùng với phân trang
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *         description: Số lượng người dùng trên mỗi trang
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: john_doe
 *                       email:
 *                         type: string
 *                         example: john.doe@gmail.com
 *                       roles:
 *                         type: string
 *                         example: user
 *                       profile:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             example: John
 *                           lastName:
 *                             type: string
 *                             example: Doe
 *                           age:
 *                             type: integer
 *                             example: 30
 *                           address:
 *                             type: string
 *                             example: 123 Main St
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalUsers:
 *                   type: integer
 *                   example: 50
 */
router.get('/list-paginate-user', authenticateJWT, checkAdminRole, userController.listUserPagination);
module.exports = router;
