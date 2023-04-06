const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60, // 1 hour
  });

  res
    .status(200)
    .send({
      token,
      id: user.id,
      username: user.username,
      name: user.name,
    });
});

module.exports = loginRouter;
