const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const jobRoutes = require('./routes/jobRoutes');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set ('view engine' , 'ejs');

app.use(session({
    secret: 'job-board-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 3600000}
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(logger);

app.use('/', authRoutes);
app.use('/', jobRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sever dang chay tai http://localhost:${PORT}`);
});