const Userdb = require("../model/model");

// create  and save new user
exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"content can not be empty"})
        return;
    } 
    // new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    });
    
    user.save(user).then(data=>{
        res.redirect('/add-user')
    }).catch(err=>{
        res.status(500).send({message:"something went wrong"})
    })
}

// retrive the all users and 
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id).then(data=>{
            if(!data){
                res.status(400).send({message:`user is not found with this id ${id}`})
            }else{
                res.send(data);
            }
        }).catch(err=>{
            res.status(500).send({message:`Something went wrong`})
        })
    } else{
        Userdb.find().then(data=>{
            res.send(data);
        }).catch(err=>{
            res.status(500).send({message:err.message || 'something went wrong'});
        })
    }    

}

// update the user detail
exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"User can not be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data=>{
        if(!data){
          return  res.status(400).send({message:`can not updated user with ${id}`})
        } else {
            res.send(data)
        }        
    }).catch(err=>{
        res.status(500).send({message:err.message || "Data base error in line 45 controller js"})
    })
}

// delete the user
exports.delete = (req,res)=>{
    const id = req.params.id
    Userdb.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(400).send({message:`user id does not exits ${id}`})
        }else{
            res.send({message:"user is deleted successfully"})
        }
    }).catch(err=>{
        res.send({message:`user is not deleted with this ${id}`});
    })

}