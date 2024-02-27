const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userId: {
        type : String,
    },
    TaskName: {
        type : String,
    },
    Category: {
        type : String,
    },
    Status: {
        type : String,
    }
});

const task = mongoose.model('taskName', taskSchema);
module.exports = task