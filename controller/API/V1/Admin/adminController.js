const bcrypt = require('bcrypt');
const userModel = require('../../../../model/User/user');
const jwtData = require('jsonwebtoken');
const register = require('../../../../model/Admin/register');
const task = require('../../../../model/Admin/task');
const path = require('path')
const fs = require('fs')

module.exports.register = async (req, res) => {
    try {
        let checkEmail = await register.findOne({ email: req.body.email });
        if (checkEmail) {
            return res.status(200).json({ msg: "Email is already exist", status: 0 });
        }
        else {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            let adminData = await register.create(req.body);
            if (adminData) {
                return res.status(200).json({ msg: "Data Inserted successfully", status: 1 });
            }
            else {
                return res.status(200).json({ msg: "Data not inserted", status: 0 });
            }
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Something wrong", status: 0 });
    }
}

module.exports.login = async (req, res) => {
    // console.log(req.body);
    try {
        let checkData = await register.findOne({ email: req.body.email });
        if (checkData) {
            if (await bcrypt.compare(req.body.password, checkData.password)) {
                let token = jwtData.sign({ AdminData: checkData }, 'AJ', { expiresIn: '1h' });
                return res.status(200).json({ msg: "Login Successfully...!", status: 1, record: token });
            }
            else {
                return res.status(200).json({ msg: "Password Does not match", status: 0 });
            }
        }
        else {
            return res.status(200).json({ msg: "Email not match", status: 0 });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Something wrong", status: 0 });
    }
}

module.exports.ViewAllUser = async (req, res) => {
    try {
        let userData = await userModel.find({});
        if (userData) {
            return res.status(200).json({ msg: "Here All User Details", status: 1, user: userData });
        }
        else {
            return res.status(200).json({ msg: "Record not found", status: 0 });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Something wrong", status: 0 });
    }
}

module.exports.taskName = async (req, res) => {
    try {
        let userTask = await task.create(req.body);
        if (userTask) {
            return res.status(200).json({ msg: "Task Assign successfully", status: 1 , Task : userTask});
        }
        else {
            return res.status(200).json({ msg: "Data not inserted", status: 0 });
        }  
    }
    catch (err) {
        return res.status(400).json({ msg: "Something wrong", status: 0 });
    }
}

module.exports.viewalltask = async (req, res) => {
    try {
        let taskdata = await task.find({}).populate('userids').exec();
        if (taskdata) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: taskdata });
        }
        else {
            return res.status(200).json({ msg: 'No Record found', status: 0 });
        }
    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}

module.exports.profile = async (req, res) => {

    try {
        let admin = await register.findById(req.user.id).populate('userids').exec();
        if (admin) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: admin });
        }
        else {
            return res.status(200).json({ msg: 'No Record found', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}

module.exports.editprofile = async (req, res) => {

    try {


        if (req.file) {
            console.log(req.file);
            let oldimgData = await register.findById(req.params.id);

            if (oldimgData.Adminimage) {


                let FullPath = path.join(__dirname, "../../../..", oldimgData.Adminimage);
                console.log(FullPath)
                await fs.unlinkSync(FullPath);
            }
            var imagePath = '';
            imagePath = register.imageAdminPath + "/" + req.file.filename;
            req.body.Adminimage = imagePath;
        }
        else {
            let olddata = await register.findById(req.params.id);
            var imgpath = '';
            if (olddata) {
                imgpath = olddata.Adminimage;
            }
            req.body.Adminimage = imgpath;
        }

        let adminupdated = await register.findByIdAndUpdate(req.params.id, req.body);

        if (adminupdated) {
            return res.status(200).json({ msg: 'Data Updated Succ....', status: 1, rec: adminupdated });
        }
        else {
            return res.status(400).json({ msg: 'not Updated Succ..', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}