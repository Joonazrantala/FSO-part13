require('dotenv').config()

const DATABASE_URL = process.env.TESTING
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL

module.exports = {
  SECRET: process.env.SECRET,
  DATABASE_URL,
  PORT: process.env.PORT || 3001,
  TEST_DATABASE_URL
}