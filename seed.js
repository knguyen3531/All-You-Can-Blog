// Import the Sequelize models
const { User, Post, Comment } = require('./models');

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Create users
    const user1 = await User.create({ username: 'user1', password: 'password1' });
    const user2 = await User.create({ username: 'user2', password: 'password2' });

    // Create posts
    const post1 = await Post.create({ title: 'Post 1', content: 'Content of post 1', userId: user1.id });
    const post2 = await Post.create({ title: 'Post 2', content: 'Content of post 2', userId: user2.id });

    // Create comments
    await Comment.create({ content: 'Comment 1 on Post 1', postId: post1.id, userId: user2.id });
    await Comment.create({ content: 'Comment 2 on Post 1', postId: post1.id, userId: user1.id });
    await Comment.create({ content: 'Comment 1 on Post 2', postId: post2.id, userId: user1.id });
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Call the seedDatabase function
seedDatabase();
