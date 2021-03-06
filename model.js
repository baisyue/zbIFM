/**
 * Created by 柏大树 on 2017/4/5.
 */
var mongoose = require('mongoose');
var mongodb = require('mongodb');
mongoose.Promise = Promise;

//连接数据库
mongoose.connect('mongodb://127.0.0.1/zbIFM');
var ZifSchema = new mongoose.Schema({
   name:{type:String,isRequired:true},
   addr:{type:String,isRequired:true},
   desc:{type:String,isRequired:true},
   imgSrc:{type:String,isRequired:true}
});

exports.Zif = mongoose.model('Zif',ZifSchema);

var UserSchema = new mongoose.Schema({
   username:{type:String,isRequired:true},
   password:{type:String,isRequired:true},
   auth:{type:Number,default:1,isRequired:true}
});

exports.User = mongoose.model('User',UserSchema);