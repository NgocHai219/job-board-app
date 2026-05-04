const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String , required: true, trim: true},
    company: { type: String, required: true, trim: true},
    salary: {type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Job', JobSchema);