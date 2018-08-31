var express = require('express')

var router = express.Router();

var controller = require('../../controllers/controller');
var path = require('path');

var multer = require('multer');
var upload = multer({storage: multer.diskStorage({

    destination: function (req, file, callback) 
    { callback(null, './uploads');},
    filename: function (req, file, callback) 
    { callback(null, file.fieldname +'-' + Date.now()+path.extname(file.originalname));}
  
  }),
  
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(/*res.end('Only images are allowed')*/ null, false)
    }
    callback(null, true)
  }
  });
router.get('/api', controller.getAll);
router.get('/api/:_id',controller.get);
router.get('/vote/:_id',controller.voteid);
router.get('/vote',controller.voteall);
router.put('/update/:_id',controller.update);
router.put('/voteupdate/:_id',controller.voteupdate);
router.delete('/delete/:_id',controller.delete);
router.post('/new',controller.save);
router.post('/vote',upload.any(),controller.votesave);
router.post('/check',controller.check);

module.exports = router;