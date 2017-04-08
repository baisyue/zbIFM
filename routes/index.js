/**
 * Created by 柏大树 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();
var Zif = require('../model').Zif;
router.get('/',function(req,res){
  Zif.find(function(err,zifs){
      res.render('index',{
          zifs:zifs
      })
    })
});

module.exports = router;
