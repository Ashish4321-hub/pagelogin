var express=require('express');
var app=express();
app.set("view engine","pug");
var mangoose=require('mongoose');
mangoose.connect('mongodb://localhost/my_db');
var personSchema =mangoose.Schema({
  name :String,
  age: Number,
  nationality : String
});
var Person = mangoose.model("Person",personSchema);

app.get('/person', function(req, res){
  res.render('person');
});
app.listen(3000);