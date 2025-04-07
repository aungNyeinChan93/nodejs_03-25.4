const router = require('express').Router()
const ProductController = require('../controllers/productController')

router.use('/', (req, res, next) => {
    console.log('hit /api/products');
    next();
})

router.get('/', ProductController.all)
router.post('/', ProductController.create)
router.get('/filter/:rate', ProductController.filterByCategory)


module.exports = router