/**
 * Created by 柏大树 on 2017/3/28.
 */
var express =require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app =express();
app.use(express.static(path.resolve('public')));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs')__express);
app.listen(8080);