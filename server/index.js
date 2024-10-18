const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const scheduledFunctions = require('./cronJobs')
require('dotenv').config()
const keys = require('../config/keys')
// const expressFileUpload = require('express-fileupload')
require('./models/User')
require('../services/passport/passport')
const http = require('http')
const createSocket = require('./sockets/index.js')
const cors = require('cors') // Import the cors middleware


const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})


app
  .prepare()
  .then(() => {
    const server = express()
    const httpServer = http.createServer(server)

    createSocket(httpServer)

    if (!dev) {
      server.use(function (req, res, next) {
        var proto = req.headers['x-forwarded-proto']
        if (proto === 'https') {
          res.set({
            'Strict-Transport-Security': 'max-age=31557600'
          })
          return next()
        }
        res.redirect('https://' + req.headers.host + req.url)
      })
    }

    // will check that webhook route is not processed as JSON.
    // add any other routes to this that need that treatment.
    server.use((req, res, next) => {
      if (req.originalUrl === '/api/payment/webhook') {
        next()
      } else {
        express.json()(req, res, next)
      }
    })
    server.use(express.urlencoded({ extended: true }))
    server.use(
      cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
      })
    )
    server.use(cors())

    server.use(passport.initialize())
    server.use(passport.session())
    // server.use(expressFileUpload())
    scheduledFunctions.initScheduledJobs()
    const getRoutes = require('./routes/index.js')
    server.use('/api', getRoutes)
    // const routes = getRoutes();

    // server.get(
    //     "/service-worker.js",
    //     express.static(path.join(__dirname, ".next"))
    //   );

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    // server.listen(PORT, err => {
    //   if (err) throw err;
    //   console.log(`> Ready on ${PORT}`);
    // })

    httpServer.listen(PORT, err => {
      if (err) throw err
      console.log(`> Ready on ${PORT}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
