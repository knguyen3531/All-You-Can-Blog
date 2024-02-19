const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Home route to get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { 
          model: User,
          attributes: ['username']  // Include the username of the post's author
        },
        { 
          model: Comment, 
          include: [
            {
              model: User, 
              attributes: ['username']  // Include the username of the comment's author
            }
          ]
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: { userId: req.session.userId },
      include: [
        {
          model: Comment, 
          include: [{ model: User, attributes: ['username'] }]
        }
      ]
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));

    res.render('dashboard', { posts, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to serve the signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to serve the login page
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
