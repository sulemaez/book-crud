const express = require('express');
let app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const uuid = require('uuid/v4')
const MongoStore = require('connect-mongo')(session)
const router = require('./routes/main.route')

app.use(bodyParser.urlencoded({ extended : true}));
app.use(cookieParser());

//connect to mongo
mongoose.connect('mongodb://localhost/crud',(err)=>{
    mongoose.Promise = global.Promise
    global.db = mongoose.connection
    setup()
})


function setup(){
    //create our session with store
    app.use(session({
        genid: (req) => {
        return uuid() // use UUIDs for session IDs
        },
        store: new MongoStore({mongooseConnection:mongoose.connection}),
        secret: 'iugvhjkjv',
        resave: false,
        saveUninitialized: true
    }))


    //set the path to static files
    app.use(express.static(__dirname+'/public/'))

    //define template engine
    app.set('view engine', 'ejs')

    //middleware
    app.use(router)
    
    app.get('/',(req,res)=>{
        //send to login
        res.render('login');
    })

  


    let port = 3001


    app.listen(port, () => {
        console.log(`Server started on ${port}`)
    })
}