const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeEach(async () => {  
await Blog.deleteMany({})  
await Blog.insertMany(initialBlogs)})




test.only('blog list application returns the correct amount of blog posts', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test.only('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  assert.ok('id' in response.body[0], 'Key "id" should exist');
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'test Author',
    url: 'www.blog.com',
    likes: 4,
    id: 'dajdasdaje3423'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  //console.log(blogsAtEnd)
  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1)
  const contents = blogsAtEnd.body.map(n => n.title)  
  assert(contents.includes('New Blog'))
})

test('a blog without likes can be added ', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'test Author',
    url: 'www.blog.com'
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
//   const blogsAtEnd = await api.get('/api/blogs')
//   //console.log(blogsAtEnd)
  assert.strictEqual(0, addedBlog.body.likes)
//   const contents = blogsAtEnd.body.map(n => n.title)  
//   assert(contents.includes('New Blog'))
})

test('a blog without title or url CANT be added', async () => {
  const newBlog = {
    author: 'test Author'
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await api.get('/api/blogs')
//   //console.log(blogsAtEnd)
   assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)
//   const contents = blogsAtEnd.body.map(n => n.title)  
//   assert(contents.includes('New Blog'))
})

after(async () => {
  await mongoose.connection.close()
})