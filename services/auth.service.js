//bycrypt package used for encryption and hashing
const bycrpt = require('bcrypt')

//hashes a password and stores the user in the db
exports.hash = async (password) =>{
    return new Promise(resolve =>{
         //function to hash
        //takes the text to hash and a salt in this case 10
        //the the callback function
        bycrpt.hash(password,10,(err,hash)=>{
            resolve(hash)            
        })
    })
}