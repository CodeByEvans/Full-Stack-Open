const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blogs) => sum + (blogs.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((maxBlog, currentBlog) => {
        return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}