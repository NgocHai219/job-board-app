const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', async(req, res) => {
    try{
        const jobs = await Job.find()
        .populate('applicants')
        .sort({ createdAt: -1});
        res.render('index' , { jobList: jobs, user: req.session.user});
    } catch(err) {
        console.error("Loi lay danh sach job",err);
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

router.post('/apply/:id', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const job = await Job.findById(req.params.id);

        if(!job.applicants.includes(req.session.user._id)) {
            job.applicants.push(req.session.user._id);
            await job.save();
        }
        res.send('<script>alert("Ung tuyen thanh cong!"); window.location.href="/";</script>');
    } catch (err) {
        console.error(err);
        res.status(500).send('Loi khi ung tuyen')
    }
});

module.exports = router;  