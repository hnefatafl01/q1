const ezc = require('express-zero-config');
const request = require('request');
const cors = require('cors');
const path = require('path');
const knex = require('knex')
var apiURL = "https://raw.githubusercontent.com/davejt/exercise/master/data/exercises";

const router = ezc.createRouter();

router.use(cors());

router.get('/muscles', (req, res, next) => {
  request(apiURL,function(err,result, body) {
    res.json(body);
  })
});

ezc.startServer(router); // startServer parameters: (express.Router, port_number)
