const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('../config/keys');
require('../models/User');
require('../services/passport/passport');



const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app
    .prepare()
    .then(() => {
        const server = express();

        if (!dev) {
            // Enforce SSL & HSTS in production
            server.use(function(req, res, next) {
              var proto = req.headers["x-forwarded-proto"];
              if (proto === "https") {
                res.set({
                  'Strict-Transport-Security': 'max-age=31557600' // one-year
                });
                return next();
              }
              res.redirect("https://" + req.headers.host + req.url);
            });
          }

        server.use(bodyParser.json({limit: '50mb'}));
        server.use(
        cookieSession({
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [keys.cookieKey]
        })
        );
        server.use(passport.initialize());
        server.use(passport.session());

        const getRoutes = require('./routes/index.js');
        server.use('/api', getRoutes);
        // const routes = getRoutes();
        
        // server.get(
        //     "/service-worker.js",
        //     express.static(path.join(__dirname, ".next"))
        //   );

        server.get("*", (req, res) => {
            return handle(req, res);
        })

        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`> Ready on ${PORT}`);
        })

    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    })