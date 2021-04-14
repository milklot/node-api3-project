const express = require('express');
const users = require('./users-model');
const posts = require('../posts/posts-model');
const middleware = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
    .then(usersObj => {
      res.status(200).json(usersObj);
    })
    .catch(() => {
      res.status(500).json({
        message: "something went wrong"
      })
    })
});

router.get('/:id', middleware.validateUserId,  (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
    res.status(200).json(req.user);
});

router.post('/', middleware.validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser)
    })
    .catch(next)
});

router.put('/:id',middleware.validateUserId, middleware.validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  users.update(req.params.id, req.body)
    .then(async () => {
      const newuser = await users.getById(req.params.id);
      res.status(200).json(newuser);
    })
    .catch(next)
});

router.delete('/:id',middleware.validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const user = await users.getById(req.params.id);
  users.remove(req.params.id)
    .then(() => {
      res.status(200).json(user);
    })
    .catch(next)
});

router.get('/:id/posts',middleware.validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
    .then(postsObj => {
      res.status(200).json(postsObj)
    })
    .catch(next)
});

router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const user_id = req.params.id
  const newPost = {...req.body, user_id: user_id }
  posts.insert(newPost)
    .then(success => {
      res.status(200).json(success) 
    })
    .catch(next)
});

// do not forget to export the router

module.exports = router;