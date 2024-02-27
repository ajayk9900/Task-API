const express = require('express');
const routs = express.Router();
const passport = require('passport');

// Require modules
const adminController = require('../../../../controller/API/V1/Admin/adminController');
const taskController = require('../../../../controller/API/V1/task/taskController');
const register = require('../../../../model/Admin/register');

// Register Admin
routs.post('/register', adminController.register);
routs.put('/editprofile/:id',passport.authenticate('jwt',{failureRedirect:"/admin/failLogin"}),register.uplodeimg,adminController.editprofile);
routs.get('/profile',passport.authenticate('jwt',{failureRedirect:"/admin/failLogin"}),adminController.profile);
routs.post('/add_task',passport.authenticate('jwt',{failureRedirect:"/admin/failLogin"}),taskController.add_task);

// Login Admin
routs.post('/login', adminController.login);

// View All User
routs.get('/ViewAllUser', passport.authenticate('user', { failureRedirect: '/admin/failLogin' }), adminController.ViewAllUser);
routs.get('/failLogin', async (req, res) => {
    return res.status(200).json({ msg: "Login Failed", status: 0 });
});

// View All Task
routs.get('/viewalltask',passport.authenticate('jwt',{failureRedirect:"/admin/failLogin"}),adminController.viewalltask)

// Add Task
routs.post('/taskName', passport.authenticate('jwt', { failureRedirect: '/admin/failLogin' }), adminController.taskName);


// Require user
routs.use('/user', require('../User/user'));

module.exports = routs;