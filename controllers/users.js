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

  const existingUser = await User.findOne({ username }).populate(
    'favoriteCraftables'
  );

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

usersRouter.post('/add-favorite', async (req, res) => {
  const { username, itemID } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: 'Invalid user' });
  }

  if (!itemID) {
    return res.status(400).json({ error: 'Item required' });
  }

  if (user.favoriteCraftables.includes(itemID))
    return res.status(201).json(savedUser);

  user.favoriteCraftables.push(itemID);
  const savedUser = await user.save();

  const returnUser = await User.findOne({ username }).populate(
    'favoriteCraftables'
  );
  res.status(201).json(returnUser);
});

usersRouter.post('/remove-favorite', async (req, res) => {
  const { username, itemID } = req.body;

  const user = await User.findOne({ username }).populate('favoriteCraftables');

  if (!user) {
    return res.status(401).json({ error: 'Invalid user' });
  }

  if (!itemID) {
    return res.status(400).json({ error: 'Item required' });
  }

  user.favoriteCraftables = user.favoriteCraftables.filter(
    (craftable) => craftable._id.toString() !== itemID.toString()
  );

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
