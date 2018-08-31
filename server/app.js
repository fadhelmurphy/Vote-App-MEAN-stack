const express = require('express'),
  app = express(),
  path = require('path'),
  favicon = require('serve-favicon'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  mongoose = require("mongoose"),
  cors = require('cors'),
  ExpressValidator = require('express-validator'),
  crud = require('./routing/api/api.route'),
  auth = require('./routing/auth/auth.route');

// MongoDB configuration
mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useMongoClient: true
  })
  .then(() => {
    console.log(`Succesfully Connected to the Mongo Database  at URL : mongodb://127.0.0.1:27017/blog`)
  })
  .catch(() => {
    console.log(`Error Connecting to the Mongo Database at URL : mongodb://127.0.0.1:27017/blog`)
  })

// view engine setup
app.set('views', path.join(__dirname, '../client/dist'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static('uploads'));
app.set('trust proxy', 1); // trust first proxy
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
app.use(cors());
app.use(ExpressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Create,Read.Delete,Update Operation
app.use(crud);
// Login & Registration
app.use(auth);

// Front-End Angular
app.get('/*', function (req, res) {
  console.log('render home');
  res.sendFile(path.join(__dirname, '../client/dist/', 'index.html'));
});

/**
 * Socket events
 */
var server = app.listen(3000);
var io = require('socket.io').listen(server);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers",
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
  next();
});
// app.post('/fileupload', upload.any('photo'), function (req, res) {
//   for(let i = 0;i<req.files.length;i++){
//   if (req.files) {
//     return res.send({result : 'success',message:'Upload berhasil'});
//   } else {
//     console.log('kamu upload apa hayoo');
//     return res.send('kamu upload apa gan? file apa hayoo');
//   }
// }
// }); 


// socket io
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
  socket.on('Updated', function (gistUpdated) {
    io.emit('Updated', gistUpdated);
  });
  socket.on('Saved', function (gistSaved) {
    io.emit('Saved', gistSaved);
  });
});


module.exports = app;