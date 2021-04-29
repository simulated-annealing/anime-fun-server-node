const express = require('express')
const app = express()
const session = require('express-session')

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:root@cluster0.oqept.mongodb.net/cs5610', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('mongoose is connected!'))

app.use(session({
  secret: '%WRuWDPj5P!kr^Td',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 
    'Content-Type, X-Requested-With, Origin')
  res.header('Access-Control-Allow-Methods', 
    'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// bodyParser is deprecated in express 4.16+, using the latest apporach here...
app.use(express.json())
app.use(express.urlencoded({extended:false}))

require('./controllers/user-controller')(app)
require('./controllers/comment-controller')(app)
require('./controllers/activity-controller')(app)
require('./controllers/feedback-controller')(app)
require('./controllers/follow-controller')(app)


app.listen(process.env.PORT || 3001)