const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Mount the route modules on their respective paths
router.use('/', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Export the configured router to be used in the main server setup
module.exports = router;
