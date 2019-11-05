const User = require('../models/user.model')
const auth = require('../services/auth.service')
const bookCon = require('./book.controller')

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
       
       res.render('login',{ error : false,message:"User created"});
   })

}


exports.login = (req,res) =>{
   let user = req.body.username
   let pass = req.body.password

   User.findOne({ username : user },async (err,result)=>{
       if(err){
          res.render('login',{ message: false,error :true , errorMessage : "Internal serve errror !" });
         return
       }

       if(result == null){
           res.render('login',{ message: false,error :true , errorMessage : "Invalid credentials" }); 
           return
       }
       
       let confirmed = await auth.confirm(pass,result.password)
       if(!confirmed){
         res.render('login',{ message: false,error :true , errorMessage : "Invalid credentials" }); 
         return
       }
       
       req.session.username = user
       req.session.userId = result._id
       bookCon.goHome(res)
   })
}


exports.logout = (req,res) =>{
    
   //destroy session
   req.session.destroy((err)=>{
     
   })
   //take to login page

   res.render('login',{error:false,message:"Logged out !"})
}