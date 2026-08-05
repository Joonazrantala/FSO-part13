const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const authorsRouter = require("./controllers/authors")
const resetRouter = require("./controllers/reset")
const getRouter = require("./controllers/get")
const {errorHandler, tokenExtractor} = require("./util/middleware")
const { sync } = require('./models/blog')

app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/authors", authorsRouter)
app.use("/api/reset", resetRouter)
app.use("/", getRouter)
app.use(tokenExtractor)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()