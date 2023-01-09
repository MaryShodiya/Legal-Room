const express = require('express') //connect express to server
const app = express() //connect application to express server
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require("method-override")
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')
const commentRoutes = require("./routes/comments");
const questionRoutes = require('./routes/question')
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port, you better catch it!!`)
})

const io = require('socket.io')(server) //connect server to socket.io


const dotenv = require('dotenv')
dotenv.config({path: './config/.env'}) //database string


// Passport config
require('./config/passport')(passport)



connectDB()





app.set('view engine', 'ejs')
app.use(express.static('node_modules/tw-elements/dist/js'))
app.use('/public/images', express.static('public/images'))
app.use('/public/css', express.static('public/css'))
app.use('/public/js', express.static('public/js'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true})) //parse request path
app.use(express.json()) //parse JSON response
app.use(logger('dev'))

//connect express to socket
app.use(function(req, res, next){
    res.io = io;
    next();
  });

app.use(methodOverride("_method"))

// Sessions
app.use(
    session({
      secret: process.env['DB_STRING'],
      resave: false,
      saveUninitialized: false,
      store:  new MongoStore({ mongooseConnection: mongoose.connection }),
      
    })
    
  )

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/post', postRoutes)
app.use('/question', questionRoutes)
app.use("/comment", commentRoutes);



