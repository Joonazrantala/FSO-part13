const router = require("express").Router()
const {User, Blog} = require("../models/index")
const { sequelize } = require("../util/db")
const {errorHandler} = require("../util/middleware")

router.get('/', async (req, res) => {
console.log("moi")
  const blogs = await Blog.findAll({
    group: 'author',
    attributes: ['author', [sequelize.fn('SUM', sequelize.col('likes')), 'likes'], [sequelize.fn('COUNT', sequelize.col('id')), 'blogs']
    ]
  })
  res.json(blogs)
})

module.exports = router