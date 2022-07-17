const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { body } = req;

  if (!body.username || !body.password) {
    return res.status(404).json({
      error: 'No empty fields allowed',
    });
  }

  const user = await User.findOne({ username: body.username }).populate(
    'favoriteCraftables',
  );

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '12h' });

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
    role: user.role,
    favorites: user.favoriteCraftables,
  });
});

module.exports = loginRouter;
