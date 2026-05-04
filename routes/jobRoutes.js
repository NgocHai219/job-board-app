const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', async(req, res) => {
    try{
        const jobs = await Job.find().sort({ createdAt: -1});
        res.render('index' , { jobList: jobs});
    } catch(err) {
        res.status(500).send('Server Error');      
    }
    
});

router.get('/add', (req, res) => {
    res.render('add-job');
});

router.post('/add', async(req, res) => {
    try {
        const newJob = new Job({
            title: req.body.title,
            company: req.body.company,
            salary: req.body.salary
        });

        await newJob.save();
        res.redirect('/');
    } catch(err) {
        res.status(400).send('Loi khi luu du lieu');
    }
});

module.exports = router;  