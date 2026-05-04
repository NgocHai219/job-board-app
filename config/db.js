const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/jobBoardDB');
        console.log('MongoDB Connected.')
    } catch (err) {
        console.error('Error: err.messeage');
        process.exit(1);

    }
};

module.exports = connectDB;