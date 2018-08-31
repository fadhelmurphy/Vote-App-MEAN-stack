'use strict';

var func = {
  save: function(db,data,res,result){
    var db = db(data);
    db.save(function(err) {
      if(err) {

        console.log('Error while saving : ' + err);
        return res.json({ result:'error',message: 'Error while saving : ' + err });

      } else {

        result();

      }
    });
  },

  update: function(db,id,data,error,result){
    return db.findByIdAndUpdate(id,data, function(err, blog) {
      if(err){
        res.statusCode = 500;
        console.log('Internal error(%d): %id',res.statusCode,err.message);
        return res.json({ result:'error',message: 'Server error' });
      }
      else if(!blog) {
        error();
      }else{
        result();
      }
    });
  },
  findOne: function(data,one,error,result){
    return data.findOne(one, function(err, blogs) {
      if(err){
        console.log("Data not found Error at : %s",err);
      }
      if(!blogs){
        error();
      }
      else{
        result(blogs);
      }
    });
  },
  delete: function(data,id,res,error,result){
    return data.findByIdAndRemove(id, function(err, blog) {
      if(!blog) {
        error();
      }
      if(err) {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
        result();
        return res.json(blog);

    });
  },

  findById: function(data,id,res,result){
    return data.findById(id, function(err, blogs) {
      if(err){
        console.log("Data not found Error at : %s",err);
      }
      if(!blogs){
        // res.send("Data not found");
        return res.json({ result:'error',message: 'Data not found' });
      }
      else{
        result(blogs);
      }
    });
  },

  findAll: function(data,req,res){
    return data.find(function(err, blogs) {
      if(err){
        console.log("Failed to show all data,Error at : %s",err);
      }
      if(!blogs){
        res.send('table post is empty',404);
        return res.json({ result:'error',message: 'table post is empty' });
      }else {

        return res.json(blogs);
      }
    });
  }

};

module.exports = func;
