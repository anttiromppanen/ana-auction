const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { name, username, password, passwordAgain } = req.body;

  if (!name || !username || !password || !passwordAgain) {
    return res.status(404).json({
      error: 'No empty fields allowed',
    });
  }

  if (username.length < 3 || username.length > 20) {
    return res.status(404).json({
      error: 'Username must be between 3 and 20 characters',
    });
  }

  if (password.length < 6) {
    return res.status(404).json({
      error: 'Password must be at least 6 characters',
    });
  }

  if (password !== passwordAgain) {
    return res.status(404).json({
      error: 'Passwords do not match',
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
    role: 'user',
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;
