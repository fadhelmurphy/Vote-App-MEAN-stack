//  Configuration
var model = require("../model/config");

//  Table Blog from MongoDB
var blog = model.Blog;
//  Table Users from MongoDB
var users = model.Users;
//  Table Users from MongoDB
var polling = model.Polling;

// Functionable to use
var func = require("../functions/func");

var controller = {
  save: function(req, res) {
    console.log(localStorage.getItem("user"));
    var data = {
      name: req.body.name,
      author: localStorage.getItem("user"),
      content: req.body.content
    };
    func.save(blog, data, res, result => {
      console.log("Post Created!");
      console.log(data);
      return res.json({
        result: "success",
        message: "Post Created!"
      });
    });
  },

  update: function(req, res) {
    var data = {
      name: req.body.name,
      author: req.body.author,
      content: req.body.content
    };
    func.update(
      blog,
      req.params._id,
      data,
      error => {
        res.statusCode = 404;
        return res.json({
          result: "error",
          message: "Not found"
        });
      },
      result => {
        console.log("Data Changed!");
        console.log(req.body.author);
        return res.json({
          result: "success",
          message: "Data Changed!",
          data
        });
      }
    );
  },

  verify: function(req, res) {
    if (!req.body) {
      res.write("paramater tidak ada");
    }

    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("username", "Username must be minimum 3 characters long.")
      .len(3); // error
    req
      .checkBody("password", "Password must be minimum 3 characters long.")
      .len(3); // error

    var errors = req.validationErrors();
    var err = [];
    if (errors) {
      err.length = 0;
      for (var i in errors) {
        // console.log(errors);
        err.push({
          result: "error",
          message: errors[i].msg
        });
      }
      console.log(err);
      return res.json(err);
    } else {
      func.findOne(
        users,
        {
          username: req.body.username,
          password: req.body.password
        },
        error => {
          err.push({
            result: "failed",
            message: "Username & Password invalid"
          });
          console.log(err);
          return res.json(err);
        },
        result => {
          err.length = 0;
          localStorage.setItem("user", req.body.username);
          localStorage.setItem("userid", result._id);
          console.log(localStorage.getItem("user"));
          err.push({
            userid: result._id,
            username: localStorage.getItem("user"),
            result: "success",
            message: "Login Successfull"
          });
          return res.json(err);
        }
      );
    }
  },

  delete: function(req, res) {
    if (!req.params) {
      next("paramater code tidak ada");
    }
    var id = req.params._id;
    func.delete(
      blog,
      id,
      res,
      error => {
        res.statusCode = 404;
        return res.json({ errors: "Not found" });
      },
      result => {
        console.log("Removed");
      }
    );
  },

  get: function(req, res) {
    if (!req.params) {
      res.send("parameter code tidak ada", 404);
    }
    var id = req.params._id;
    func.findById(blog, id, res, result => {
      res.send(result);
    });
  },

  getAll: function(req, res) {
    func.findAll(blog, req, res);
  },

  confirm: function(req, res) {
    if (!req.body) {
      res.send("Field harus di isi..", 404);
    }
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("username", "Username must be minimum 3 characters long.")
      .len(3); // error
    req
      .checkBody("password", "Password must be minimum 3 characters long.")
      .len(3); // error

    var errors = req.validationErrors();
    var err = [];
    if (errors) {
      err.length = 0;
      for (var i in errors) {
        err.push({
          result: "error",
          message: errors[i].msg
        });
      }
      console.log(err);
      return res.json(err);
    } else {
      data = {
        username: req.body.username,
        password: req.body.password
      };
      func.save(users, data, res, result => {
        console.log("Registration has successful");
        localStorage.setItem("user", req.body.username);
      });
    }
  },

  votesave: function(req, res) {
    var obj = JSON.parse(req.body.overrides);
    console.log('ini file',req.files);
    console.log('ini data',obj);
    var data = {
      name: obj.name,
      options: []
    };
    if(req.files.length > 0){
      for(let i = 0;i<req.files.length;i++){
          data.options.push({
            avatar: req.files[i].filename,
            optionName:obj.optionName[i],
            votes: 0
          });
      }
    } else {
      for(let i = 0;i<obj.optionName.length;i++){
          data.options.push({
            avatar: [],
            optionName:obj.optionName[i],
            votes: 0
          });
      }
    }
    func.save(polling, data, res, result => {
      console.log("Post Created!");
      console.log(data);
      res.json({
        result: "success",
        message: "Post Created!"
      });
    });
  },
  voteid: function(req, res) {
    if (!req.params) {
      res.send("parameter code tidak ada", 404);
    }
    var id = req.params._id;
    func.findById(polling, id, res, result => {
      res.send(result);
    });
  },
  voteall: function(req, res) {
    func.findAll(polling, req, res);
  },
  voteupdate: function(req, res) {
    var data = {
      options: []
    };
    var datauser = {
      pilihan: req.body.pilihan
    };
    for (var i = 0; i < req.body.options.length; i++) {
      if (req.body.options.length > 0) {
        data.options.push({
          avatar: "",
          optionName: req.body.options[i].optionName,
          votes: req.body.options[i].votes
        });
      }
    }
    func.update(
      polling,
      req.params._id,
      data,
      error => {
        res.statusCode = 404;
        return res.json({
          result: "error",
          message: "Not found"
        });
      },
      result => {
        console.log("Data Changed!");
        console.log(data);
        res.json({
          result: "success",
          message: "Data Changed!",
          data
        });
      }
    );
    func.update(
      users,
      req.body.pemilih,
      datauser,
      error => {
        res.statusCode = 404;
        return res.json({
          result: "error",
          message: "Not found"
        });
      },
      result => {
        console.log("Data Changed!");
        console.log(datauser);
      }
    );

  },
  check: function(req, res) {
    var id = req.body.pemilih;
    func.findById(users, id, res, result => {
      return res.send(result);
    });
  }
};
module.exports = controller;
