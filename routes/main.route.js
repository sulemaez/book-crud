const express = require('express')
const router = express.Router()
const authcon = require('../controllers/auth.controller')
const bookcon = require('../controllers/book.controller')
//serve pages
router.get('/login',(req,res)=>{
    if(req.session.username){
        res.render('home')
    }else{
        res.render('login',{ error : false,message : false})
    }
})

router.get('/signup',(req,res)=>{
    res.render('signup',{ error: false });
})

router.get('/home',(req,res)=>{
    if(req.session.username){
        bookcon.goHome(res)
    }else{
        res.render('login',{ error : false,message : false})
    }
    
})
router.get('/add', (req, res) => {
   res.render('view',{ edit: false})
})

router.post('/create',bookcon.create)

router.post('/register',authcon.register)
router.post('/signin',authcon.login)
router.get('/logout',authcon.logout)

module.exports = router