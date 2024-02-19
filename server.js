require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection'); // Import Sequelize instance from connection.js

// Routes
const homeRoutes = require('./controllers/homeRoutes');
const apiRoutes = require('./controllers/api/index');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as view engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up session with sequelize store
app.use(session({
    secret: process.env.SESSION_SECRET, // Use the session secret from .env
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000, // Check expired sessions every 15 minutes
        expiration: 24 * 60 * 60 * 1000  // Sessions expire after 24 hours
    })
}));

// Use Routes
app.use('/', homeRoutes);
app.use('/api', apiRoutes);

// Start the server and sync the database
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}/`);
    sequelize.sync({ force: false }).then(() => {
        console.log('Database synced');
    }).catch((error) => {
        console.error('Failed to sync database: ' + error);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
