const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { route } = require('./jobRoutes');

router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
    try {
        const {username, password, fullName, role} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            fullName,
            role
        });
        await newUser.save();
        res.redirect('/login');

    } catch(err) {
        res.status(400).send('Loi dang ky: ' + err.message);
    }
});

router.get('/login', (req, res) => res.render('login'));

router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username});

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.send('Sai tai khoan hoac mat khau');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;