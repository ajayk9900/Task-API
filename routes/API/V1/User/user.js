const express = require('express');
const routs = express.Router();
const passport = require('passport');

const userController = require('../../../../controller/API/V1/User/userController');

// Add User by admin
routs.post('/addUser', passport.authenticate('jwt', { failureRedirect: '/admin/user/failLogin' }),userController.addUser);
routs.get('/failLogin', async (req, res) => {
    return res.status(200).json({ msg: "Login Failed", status: 0 });
});

// User Login
routs.post('/userLogin', userController.userLogin);

routs.get('/profile',passport.authenticate('user',{failureRedirect:"/admin/failLogin"}),userController.profile)
routs.get('/viewalltask',passport.authenticate('user',{failureRedirect:"/admin/failLogin"}),userController.viewalltask)
routs.get('/viewalltasks',passport.authenticate('user',{failureRedirect:"/admin/failLogin"}),userController.viewalltasks)
routs.get('/activetask/:id',passport.authenticate('user',{failureRedirect:"/admin/failLogin"}),userController.activetask)

routs.put('/taskComplete/:id', passport.authenticate('user', { failureRedirect: '/admin/user/failLogin' }), userController.taskComplete);

module.exports = routs;