const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0 // This ensures it defaults to 0 if not provided
  },
})

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Blog', blogSchema)