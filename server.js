const mongoose = require('mongoose')

// if (process.env.NODE_ENV.trim() === 'development') {
//   const { mongodbURI } = require('./secrets/mongo-keys')
// } else {
//   const mongodbURI = process.env.mongodbURI
// }
const mongodbURI =
  process.env.NODE_ENV.trim() === 'development'
    ? require('./secrets/mongo-keys').mongodbURI
    : process.env.mongodbURI

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport')

const users = require('./routes/api/users')
const animals = require('./routes/api/animals')

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

//DB Config
const db = mongodbURI

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err, 'MongoDB error'))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Use routes
app.use('/api/users', users)
app.use('/api/animals', animals)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

if (process.env.NODE_ENV.trim() === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })

  app.enable('trust proxy')
  app.use((req, res, next) => {
    if (req.secure) next()
    else res.redirect(`https://'${req.headers.host}${req.url}`)
  })
}
