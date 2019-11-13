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
      goHomeFn(res,"Book Added Successfully !")
   })
}


exports.goHome = (res,message = false)=>{
   goHomeFn(res,message)
}

exports.removeBook = (req,res) =>{
  Book.deleteOne({  isbn : req.query.isbn },(err)=>{
     if(err){
        goHomeFn(res,"Error deleting book")
        return
     }

     goHomeFn(res,"Book deleted succefully !")
  })

}

exports.getEdit = (req,res) =>{
   
   Book.findOne({isbn : req.query.isbn },(err,book)=>{
       
       if(err){
          goHomeFn(res,"error getting book")
          return
       }

       res.render('view',{ edit : true,book : book})
   })
}

exports.editBook = (req,res)=>{

   Book.findOneAndUpdate({isbn : req.body.isbn},req.body,(err)=>{
      if(err){
         goHomeFn(res,"Error updating book")
         return
      }
      goHomeFn(res,"Book updated successfully !")
   })
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