const express = require('express');
let app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const uuid = require('uuid/v4')
const MongoStore = require('connect-mongo')(session)
const router = require('./routes/main.route')
const bookcon = require('./controllers/book.controller')

app.use(bodyParser.urlencoded({ extended : true}));
app.use(cookieParser());

//connect to mongo
mongoose.connect('mongodb://localhost/crud',(err)=>{

    mongoose.Promise = global.Promise
    //set global db variable to the mongoose connection
    global.db = mongoose.connection
    //contiue with the setup
    setup()
})


function setup(){
    //create our session with store
    app.use(session({
        //function to generate random user id
        genid: (req) => {
           return uuid() // use UUIDs for session IDs
        },
        //the type of storage to use in storing the session
        //we can use file storage,in memory redis , in this casse we use mongo
        store: new MongoStore({mongooseConnection:mongoose.connection}),
        //key that will identify the sessions for this app
        secret: 'iugvhjkjv',
        resave: false,
        saveUninitialized: true,
        //set the parameters of the cookie to associated with the session
        cookie :{
            //set the session the session age to 1 hr
            maxAge : 3600000,
        }
    }))


    //set the path to static files
    app.use(express.static(__dirname+'/public/'))

    //define template engine
    app.set('view engine', 'ejs')

    //middleware
    app.use(router)
    
    app.get('/',(req,res)=>{
        if(req.session.username){
            bookcon.goHome(res)
        }else{
            res.render('login',{ error : false,message : false})
        }
    })

    let port = 3001

    app.listen(port, () => {
        console.log(`Server started on ${port}`)
    })
}