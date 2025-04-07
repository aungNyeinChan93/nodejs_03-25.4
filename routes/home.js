const router = require('express').Router()
const HomeController = require('../controllers/homeController')

router.use('/', (req, res, next) => {
    console.log(`hit / `);
    next()
})

router.get('/', HomeController.index)
router.post('/', HomeController.create)
router.get('/allUsers', HomeController.allUsers)

// filter By Age
router.get('/filterByAge/:age', HomeController.filterByAge)

// skillup
router.patch('/skillup/:id', HomeController.skillUp)

module.exports = router 