var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({

  name:    {
    type    : String,
    require : true
  },
  author:   {
    type: String,
    require : true
  },
  content:   {
    type: String,
    require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  }
});
var Users = new Schema({

  username:    {
    type    : String,
    require : true
  },
  password:   {
    type: String,
    require : true
  },
  pilihan: {
    type: Array
  }
});
var Polling = new Schema({

  name:    {
    type    : String,
    require : true
  },
  options: [{
    avatar: String,
    optionName: String,
    votes: Number
  }]
});
module.exports = {
  Blog : mongoose.model('Blog', Blog),
  Users : mongoose.model('Users', Users),
  Polling : mongoose.model('Polling', Polling)
}
