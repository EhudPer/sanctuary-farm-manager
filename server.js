const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const animals = require('./routes/api/animals')

const app = express()

app.use(bodyParser.json())

//DB Config
const db = require('./config/keys').mongodbURI

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err, 'MongoDB error'))

// Use routes
app.use('/api/animals', animals)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy')
  app.use((req, res, next) => {
    if (req.secure) next()
    else res.redirect(`https://'${req.headers.host}${req.url}`)
  })
}

const PUBLIC_DIR = process.cwd() + '/dist'

app.use(express.static(PUBLIC_DIR))

app.get('/*', function(req, res) {
  res.sendFile(path.join(PUBLIC_DIR + '/index.html'))
})
