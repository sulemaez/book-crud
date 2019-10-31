const express = require('express')
const router = express.Router()
const authcon = require('../controllers/auth.controller')
//serve pages
router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/signup',(req,res)=>{
    res.render('signup',{ error: false });
})

router.get('/home',(req,res)=>{
    res.render('home');
})

router.post('/register',authcon.register)


module.exports = router