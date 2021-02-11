const axios = require("axios");
let baseUrl = process.env.BASEURL

exports.homerRoutes = (req,res)=>{
    // make a get request for users
    axios.get(baseUrl+'/api/users').then(response=>{
        res.render('index',{users:response.data})
    }).catch(err=>{
        res.status(500).send({message:err.message || 'something went wrong'})
    })
   
}

exports.add_user = (req,res)=>{
    res.render('add_user')
}

exports.update_user = (req,res)=>{
    axios.get(baseUrl+'/api/users',{params:{id:req.query.id}}).then(userdata=>{
        res.render('update_user',{user:userdata.data})
    }).catch(err=>{
        res.status(500).send({message:err.message || 'something went wrong'})
    })
   
}

