const db = require('../users/users-model');

function logger(format) {
  // DO YOUR MAGIC
  return (req, res, next) => {
    const time = new Date().toISOString()

    switch (format) {
      case "short":
    console.log(`${req.ip} ${req.url} ${req.method}`)
        break
      case "long":
    console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
        break
      default:
        return next("Error: Need a logger format")
    }
  next();
  }
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const user = db.getById(req.params.id);
  if (!user) {
    return res.status(404).json({
        message: "user with this id not found"
      })
  }
  req.user = user;
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body) {
    return res.status(404).json({
      message: "please fill out all fields"
    })
  }
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text || !req.body) {
    return res.status(404).json({
      message: "please fill out all fields"
    })
  }
  next();
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};
