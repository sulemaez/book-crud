let Book = require('../models/book.model')

exports.create = (req,res) =>{
    //implement validation

   let book = new Book({
        isbn : req.body.isbn,
        title :req.body.title,
        author :req.body.author,
        year : req.body.year,
        amount :  req.body.amount
   })

   book.save((err)=>{
      if(err){ 
         console.log(err) 
        res.render('view',{ edit : false})
        return
      }  
      goHomeFn(res,"Book edited")
   })
}


exports.goHome = (res,message = false)=>{
   goHomeFn(res,message)
}

function goHomeFn(res,message = false){
    
    Book.find({},(err,books)=>{
        
        if(err){
            console.log("Error getting all")
            res.render('home',{ message : message,books:[]})
            return
        }
       
       let load = { message : message,books:books }
       res.render('home',load)
    })
}