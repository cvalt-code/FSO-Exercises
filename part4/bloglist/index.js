const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret._id;
    return ret;
  }
});

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((error) => {
            console.log("error connection to MongoDB", error.message)
        })



app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const {title, author, url, likes } = request.body
  const blog = new Blog({title, author, url, likes })

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})