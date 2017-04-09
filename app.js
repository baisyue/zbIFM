/**
 * Created by 柏大树 on 2017/3/28.
 */
var express =require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app =express();
app.use(express.static(path.resolve('public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
app.use('/',require('./routes/index'));
app.use('/zif',require('./routes/zif'));










app.listen(8080,function(){
    console.log('zbIFM @ 8080 has been started @' +new Date().toLocaleString());
});
