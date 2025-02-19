const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({}).populate('blogs');
        response.json(users);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error fetching users' });
    }
});

userRouter.post('/', async (request, response) => {
    const { username, name, password} = request.body

    if (!username || !password) {
        return response.status(400).json({ error: 'Username and password are required' });
    }

    if (username.length < 3|| password.length < 3) {
        return response.status(400).json({error: 'Username and Password must be at least 3 characters long'})
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return response.status(400).json({ error: 'Username already taken' });
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)


    const user = new User({
        blogs: [],
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error creating user' });
    }
})

module.exports = userRouter