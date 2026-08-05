const router = require('express').Router()
const {User, Blog} = require("../models/index")
const {tokenExtractor} = require("../util/middleware")
const { Op, sequelize } = require('sequelize')

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    order: [['likes', 'DESC']],
    include: {
      model: User,
      attributes: ['name']
    },
    where: {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search ? req.query.search : ""
          },
        },
        {
          author: {
            [Op.substring]: req.query.search ? req.query.search : ""
          }
        }
      ]
    }
  })
  res.json(blogs)
})

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const newBlog = await Blog.create({...req.body, userId: user.id})
    return res.json(newBlog)
  } catch(error) {
    next(error)
  }
})

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const blogToDelete = await Blog.findOne({where: {id: req.params.id}})

    if (!blogToDelete) {
      return res.status(404).json("Blog not found")
    }

    if (blogToDelete.dataValues.userId !== req.decodedToken.id) {
      return res.status(403).json("Can't delete other users blogs")
    }

    await blogToDelete.destroy()
    return res.status(204).end()
  } catch(error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
    return res.json(blog)
  } catch(error) {
    next(error)
  }
})

module.exports = router