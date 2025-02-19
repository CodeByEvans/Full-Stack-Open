const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User= require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    .populate({
      path: 'user',
      select: '-blogs'
    });
    response.json(blogs);
  } catch (error) {
    response.status(500).json({ error: 'Error al obtener blogs' });
  }
});

blogsRouter.put('/:id',middleware.userExtractor, async (request,response) => {
  const { title, author, url, likes, user } = request.body

  const updatedBlogData = {
    title,
    author,
    url,
    likes,
    user
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogData)

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found'})
    }

    response.json(updatedBlog)
  } catch (error) {
    console.error('Error updating blog:', error)
    response.status(400).json({error: 'Error updating blog'})
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if(!title) {
    return response.status(400).json({ error: 'Title is required' });
  }

  if (!url) {
    return response.status(400).json({ error: 'URL is required' });
  }

  try {
    const user = request.user

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);

  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const user = request.user

  try {

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({error: 'blog not found'})
    }
    if (blog.user.toString() !== user.id) {
      return response.status(403).json({error: 'Unauthorized to delete this blog'})
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter