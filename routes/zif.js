/**
 * Created by 柏大树 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();
var Zif = require('../model').Zif;


router.post('/add',function(req,res){
	var ifs = req.body;//InterFaces
	Zif.create(ifs,function(err,docs){
		res.send(ifs);
	})
});


module.exports = router;