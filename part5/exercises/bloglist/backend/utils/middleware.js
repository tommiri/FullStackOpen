const jwt = require('jsonwebtoken');

const logger = require('./logger');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  }

  next();
};

const userExtractor = (req, res, next) => {
  if (!req.token) {
    throw new jwt.JsonWebTokenError('Token missing or invalid');
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  req.user = decodedToken;
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted ID' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res
      .status(401)
      .json({ error: 'Token missing or invalid' });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  next(err);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
