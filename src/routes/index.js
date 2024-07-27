const express = require('express');
const router = express.Router();


// router.all('*', checkUserJWT, checkUserPermission);


router.use('/auth', require('./account'))


router.use('/users', require('./users'))


router.use('/products', require('./product'))


router.use('/category', require('./category'))


router.use('/invoice', require('./invoice'))



module.exports = router;