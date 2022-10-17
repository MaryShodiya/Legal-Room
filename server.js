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
/*const profileRoutes = require('./routes/profile')*/
const chatRoutes = require('./routes/chatroom')
const deleteRoutes = require('./routes/delete')
const userRoutes = require('./routes/users')
const { decode } = require('./middleware/jwt')
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port, you better catch it!!`)
})
const socketio = require('socket.io')(server)

require('dotenv').config({path: './config/.env'}) //database string


// Passport config
require('./config/passport')(passport)



connectDB()

socketio.on('connection', (socket) => {
    console.log("connected to socket")
    socket.on('setup', (userName) => {
        socket.join(userName._id)
        console.log(`${userName.firstName} is online`)
        socket.emit('connected')
    })
    
socket.on('join chat', (room) => {
    socket.join(room._id)
    console.log(`User joined chat with room : ${room}`)
})

})


/*initializeSocket.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        initializeSocket.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        initializeSocket.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        initializeSocket.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});*/


/*let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "LegalRoom"*/


/*MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
.then(client => {
    console.log(`Connected to ${dbName} Database... Catch it while you can`)
     db = client.db(dbName)
})*/


app.set('view engine', 'ejs')
app.use(express.static('node_modules/tw-elements/dist/js'))
app.use('/public/images', express.static('public/images'))
app.use('/public/css', express.static('public/css'))
app.use('/public/js', express.static('public/js'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true})) //parse request path
app.use(express.json()) //parse JSON response
app.use(logger('dev'))



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
app.use('/user', userRoutes)
app.use('/chatroom', decode, chatRoutes)
app.use('/delete', deleteRoutes)
app.use('/question', questionRoutes)
/*app.use('/profile', profileRoutes)*/







/*app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/contact', (req, res) =>{
    res.sendFile(__dirname + '/contact.html')
})

app.get('/ask', (req, res) =>{
    res.sendFile(__dirname + '/ask.html')
})

app.get('/question', (req, res) =>{
   db.collection('questions').find().sort({likes: -1}).toArray()
   .then(data =>{
     res.render('question.ejs', { info:data,
        })
   })
   .catch(error => console.error(error))
})


app.post('/addQuestion', (req, res) =>{
   db.collection('questions').insertOne({questionHeader : req.body.questionHeader,
    questionBody: req.body.questionBody
})
.then(result => {
    console.log('A New Question Added')
    res.redirect('/question')
})
 .catch(err => console.error(err))   
})


app.post('/addComment', (req, res) =>{
    db.collection('questions').updateOne({_id: req.body.info_id}, {
        $push: {
            "comments" : {comments: req.body.comment}
        }
    })
  .then(result => {
      console.log('A New Comment Added')
      res.redirect('/question')
  })
  .catch(err => console.error(err))
 })


app.put('/addOneLike', (req, res) =>{
    db.collection('questions').updateOne({questionHeader : req.body.questionHeaderS, questionBody: req.body.questionBodyS},{
         $set: {
             likes:req.body.likesS + 1
         }
     }, {
         sort: {_id: -1},
         upsert: true
     })
     .then(result => {
         console.log('Added One Like')
         res.json('Like Added')
     })
     .catch(error => console.error(error))
})

/*app.put('/addOnedislike', (req, res) =>{
    db.collection('questions').updateOne({questionHeader : req.body.questionHeaderS, questionBody: req.body.questionBodyS, dislikes: req.body.dislikesS},{
         $set: {
             dislikes: req.body.dislikesS + 1
         }
     }, {
         sort: {_id: -2},
         upsert: true
     })
     .then(result => {
         console.log('Added One DisLike')
         res.json('DisLike Added')
     })
     .catch(err => console.error(err))
})






app.delete('/deleteQuestionAdded', (req, res) =>{
    db.collection('questions').deleteOne({questionHeader : req.body.questionHeaderS})
    .then(result => {
        console.log('A New Question Deleted')
        res.json('A New Question Deleted from Json')
    })
    .catch(err => console.error(err))
})*/



/*app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port, you better catch it!!`)
})
*/