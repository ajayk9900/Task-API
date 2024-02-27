const userModel = require('../../../../model/User/user');
const bcrypt = require('bcrypt');
const jwtData = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const task = require('../../../../model/Admin/task');
const register = require('../../../../model/Admin/register');

module.exports.addUser = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    try {
        let checkEmail = await userModel.findOne({ email: req.body.email });
        if (checkEmail) {
            return res.status(200).json({ msg: "Email is already exist", status: 0 });
        }
        else {
            let password = req.body.password;
            req.body.userId = req.user.id;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            let userData = await userModel.create(req.body);
            if (userData) {
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                        user: "ajaykumawat9981@gmail.com",
                        pass: "edjxllvuhtqaocac",
                    },
                });

                const info = await transporter.sendMail({
                    from: 'ajaykumawat9981@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: "Here is your Id and Password", // Subject line
                    text: "Email and PAssword", // plain text body
                    html: `<b> Your email : ${req.body.email}</b> <br> <b>Password : ${password}</b>`, // html body
                });

                // let reg = await userModel.findById(req.user.id);
                // reg.managerIds.push(managerData.id);
                // await register.findByIdAndUpdate(req.user.id,reg)
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

module.exports.userLogin = async (req, res) => {
    try {
        let checkData = await userModel.findOne({ email: req.body.email });
        if (checkData) {
            if (await bcrypt.compare(req.body.password, checkData.password)) {
                let token = jwtData.sign({ UserData: checkData }, 'User', { expiresIn: '1h' });
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

module.exports.profile = async (req, res) => {
    try {
        let userdatas = await register.findById(req.user.id).populate('adminids').exec();
        if (userdatas) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: userdatas });
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

module.exports.viewalltask = async (req, res) => {
    try {
        let taskdata = await task.find({userids : req.user.id}).populate('adminid').exec();
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

module.exports.viewalltasks = async (req, res) => {
    try {
        let taskdata = await task.find({userids : req.user.id});
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

module.exports.activetask = async (req, res) => {
    try{
        if(req.params.id)
        {
            let taskdata = await task.findByIdAndUpdate(req.params.id,{status : "Active"});
            if(taskdata)
            {
                //console.log("Data is Active");
                return res.status(200).json({ msg: 'Task Activeted Succ....', status: 1, rec: taskdata });
            }
            else{
                //console.log("Data is Deactive");
                return res.status(200).json({ msg: 'No Record found', status: 0 });
            }
        }
        else
        {
            console.log("Params is Not Found!!!");
        }
    }
    catch(err)
    {
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}

module.exports.taskComplete = async (req, res) => {
    // console.log(req.params.id);
    try {
        let taskUp = await task.findByIdAndUpdate(req.params.id, req.body);
        if (taskUp) {
            let updateTask = await task.findOne({Status : 'Completed'});
            return res.status(200).json({ msg: 'Data Updated Succ....', status: 1, Task: updateTask });
        }
        else {
            return res.status(400).json({ msg: 'not Updated Succ..', status: 0 });
        }
    }
    catch (err) {
        return res.status(400).json({ msg: "Something wrong", status: 0 });
    }
}