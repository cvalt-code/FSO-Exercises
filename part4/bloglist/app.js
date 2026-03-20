const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const app = express()



const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })
        .then(() => {
            logger.info('Connected to MongoDB')
        })
        .catch((error) => {
            logger.error("error connection to MongoDB", error.message)
        })



app.use(express.static('dist'))
app.use(express.json())

app.use('/api/blogs', blogsRouter)



module.exports = app
