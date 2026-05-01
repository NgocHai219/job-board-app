const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set ('view engine' , 'ejs');

let jobs = [
    {id : 1, title: "Lap trinh vien NodeJS", company: "Tech ABC" , salary: "20-30M"},
    {id : 2, title: "Thiet ke UI/UX", company: "Greative Studio", salary: "15-25M"}
];

app.get('/', (req, res) => {
    res.render('index', {jobList: jobs});

});

app.get('/add', (req, res) => {
    res.render('add-job');
});

app.post('/add', (req, res) => {
    const newJob = {
        id: jobs.length +1,
        title: req.body.title,
        company: req.body.company,
        salary: req.body.salary
    };
    jobs.push(newJob);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Sever dang chay tai http://localhost:${PORT}`);
});