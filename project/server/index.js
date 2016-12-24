const ezc = require('express-zero-config');
const request = require('request');
const cors = require('cors');
const path = require('path');
var apiURL = "https://raw.githubusercontent.com/davejt/exercise/master/data/exercises";

const router = ezc.createRouter();

const app = ezc.createApp({
  router,
  static_dir: path.join(__dirname, '/client')
});

app.use(cors());

router.get('/muscles', (req, res, next) => {
  request(apiURL,function(err,result, body) {
    res.json(body);
  })
});

ezc.startServer(router); // startServer parameters: (express.Router, port_number)
