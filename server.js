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
const roomRoutes = require('./routes/posts')
const questionRoutes = require('./routes/question')
const deleteRoutes = require('./routes/delete')
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port, you better catch it!!`)
})

const io = require('socket.io')(server) //connect server to socket.io
const chatRoutes = require('./routes/chat')

require('dotenv').config({path: './config/.env'}) //database string


// Passport config
require('./config/passport')(passport)



connectDB()


/*socketio.on('connection', (socket) => {
    console.log("connected to socket")
    socket.on('setup', (userName) => {
        socket.join(userName._id)
        console.log(`${userName.firstName} is online`)
        socket.emit('connected')
    })
    
socketio.on('join chat', (room) => {
    socket.join(room._id)
    console.log(`User joined chat with room : ${room}`)
})

})*/


/*io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
       io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});*/



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
app.use('/post', roomRoutes)
app.use('/delete', deleteRoutes)
app.use('/question', questionRoutes)
app.use('/chat', chatRoutes)



