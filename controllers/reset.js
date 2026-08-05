const router = require('express').Router()
const { User, Blog } = require('../models')

router.post('/', async (req, res) => {
    await Blog.destroy({ where: {} })
    await User.destroy({where: {}})
    
    res.status(200).end()
})

module.exports = router