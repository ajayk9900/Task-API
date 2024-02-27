const task = require('../../../../model/Admin/task');
const user = require('../../../../model/user/ragister');
const admin = require('../../../../model/Admin/ragister');



module.exports.add_task = async(req,res)=>{
    try{
        
            //delete(req.body.cpass);
            
            
                let  userdata = req.body.userids;
                req.body.adminid = req.user.id;
                req.body.status = "pending";
                req.body.date = new Date().toLocaleString();
                let data =await task.create(req.body);
                
                if(data){

                    let reg = await user.findById(userdata);
                    reg.taskids.push(data.id);
                    await user.findByIdAndUpdate(userdata,reg)


                     let reg1 = await admin.findById(req.user.id);
                     reg1.taskid.push(data.id);
                     await admin.findByIdAndUpdate(req.user.id,reg1)


                    return res.status(200).json({msg:'Data Inserted Succ....',status:1,rec:data});
                }
                else{
                    return res.status(200).json({msg:'Data not Inserted Succ....',status:0});
                }
            

            
      
   }
   catch(err){
        console.log('Somthing Wrong');
        return res.status(400).json({msg:'Somthing Wrong',status:0});
   }
   
}




