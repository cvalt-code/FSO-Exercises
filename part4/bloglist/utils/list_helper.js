const dummy = (blogs) => {
  return 1;
}


const totalLikes = (blogs) => {
  const listOfLikes = blogs.map((blog) => blog.likes)
  const total = listOfLikes.reduce((partialSum, a) => partialSum + a, 0)
  return blogs.length === 0 ? 0 : total;
}


module.exports = {
  dummy, totalLikes
}