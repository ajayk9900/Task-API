const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
    // userIds: {
    //     type: Array,
    //     ref : 'User'
    // }
});

const register = mongoose.model('Register', registerSchema);
module.exports = register