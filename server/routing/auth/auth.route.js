var express = require('express')

var router = express.Router();

var controller = require('../../controllers/controller');

router.post('/',controller.verify);
router.post('/regist',controller.confirm);

module.exports = router;