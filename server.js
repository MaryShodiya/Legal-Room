const express = require('express') //connect express to server
const app = express() //connect application to express server
const MongoClient = require('mongodb').MongoClient //connect MongoDB to server
const PORT = 8000 //port localhost
require('dotenv').config() //database string

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "LegalRoom"


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
.then(client => {
    console.log(`Connected to ${dbName} Database... Catch it while you can`)
     db = client.db(dbName)
})


app.set('view engine', 'ejs')
app.use('/public/images', express.static('public/images'))
app.use('/public/css', express.static('public/css'))
app.use('/public/js', express.static('public/js'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true})) //parse request path
app.use(express.json()) //parse JSON response

app.get('/', (req, res) =>{
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
     res.render('question.ejs', { info:data })
   })
   .catch(error =>console.error(error))
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


app.put('/addOneLike', (req, res) =>{
    db.collection('questions').updateOne({questionHeader : req.body.questionHeaderS, questionBody: req.body.questionBodyS,likes: req.body.likesS},{
         $set: {
             likes:req.body.likesS + 1
         }
     }, {
         sort: {_id: -1},
         upsert: false 
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
})*/






app.delete('/deleteQuestionAdded', (req, res) =>{
    db.collection('questions').deleteOne({questionHeader : req.body.questionHeaderS})
    .then(result => {
        console.log('A New Question Deleted')
        res.json('A New Question Deleted from Json')
    })
    .catch(err => console.error(err))
})

/*let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'security' //name of database

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName) 
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('keys').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addKey', (request, response) => {
    db.collection('keys').insertOne({appName: request.body.appName,
    securityCode: request.body.securityCode, likes: 0})
    .then(result => {
        console.log('Rapper Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('keys').updateOne({appName: request.body.appNameS, securityCode: request.body.securityCodeS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteKey', (request, response) => {
    db.collection('keys').deleteOne({appName: request.body.appNameS})
    .then(result => {
        console.log('Rapper Deleted')
        response.json('Rapper Deleted')
    })
    .catch(error => console.error(error))

})*/

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
