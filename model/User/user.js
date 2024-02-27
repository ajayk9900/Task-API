const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    adminId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Register'
    }
});

const user = mongoose.model('User', userSchema);
module.exports = user