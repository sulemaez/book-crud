const User = require('../models/user.model')
const auth = require('../services/auth.service')

exports.register = async (req,res) =>{
   
   let errors = "" 
   if(req.body.username == undefined || req.body.username == ""){
      errors += "Username cannot be empty\n"
   } 

   if(req.body.password == undefined || req.body.password == ""){
      errors += "Password cannot be empty\n"
   } 

   if(errors != ""){
    res.render('signup',{error : true, errorMessage : errors}); 
    return
   }

   let user = new User({
      username : req.body.username,
      password : await auth.hash(req.body.password)
   })

   user.save(err => {
       if(err){
         res.render('signup',{error : true, errorMessage : "Something went wrong, try again"}); 
         return
       }
       
       res.render('login',{ error : false});
   })


}