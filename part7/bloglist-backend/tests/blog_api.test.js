const bcrypt = require('bcrypt')
const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// array con datos iniciales

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'http://example.com/blog1',
    likes: 10,
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'http://example.com/blog2',
    likes: 5,
  },
];

// Limpia la base de datos y se guardan los datos para hacer las pruebas

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash ('password123', 10);
    const user = new User ({username:'testuser', passwordHash});
    await user.save()
})

test('correct number of blogs as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs have an id property', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    
    response.body.forEach(blog => {
        assert.ok(blog.id, 'Blog does not have an id property')
    })
})

test('can add a blog', async () => {
    const loginResponse = await api
    .post('/api/login')
    .send({
        username: 'testuser',
        password: 'password123',
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);
    
    const token = loginResponse.body.token;

    const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'http://example.com/newblog',
        likes: 0,
    };

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    
    assert.strictEqual(response.body.title, newBlog.title)
    assert.strictEqual(response.body.author, newBlog.author)
    assert.strictEqual(response.body.url, newBlog.url)
    assert.strictEqual(response.body.likes, newBlog.likes)

    const blogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1)
})

test('when likes is missing, likes is equal to 0', async () => {
    const loginResponse = await api
        .post('/api/login')
        .send({
            username: 'testuser',
            password: 'password123',
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const token = loginResponse.body.token;

    const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'http://example.com/newblog',
    };

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.likes, 0);
});

test()

after(async () => {
    await mongoose.connection.close()
})