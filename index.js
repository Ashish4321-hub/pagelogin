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
app.post('/person', function(req, res){
  var personInfo = req.body; //Get the parsed information
  
  if(!personInfo.name || !personInfo.age || !personInfo.nationality){
     res.render('show_message', {
        message: "Sorry, you provided worng info", type: "error"});
  } else {
     var newPerson = new Person({
        name: personInfo.name,
        age: personInfo.age,
        nationality: personInfo.nationality
     });
   
     newPerson.save(function(err, Person){
        if(err)
           res.render('show_message', {message: "Database error", type: "error"});
        else
           res.render('show_message', {
              message: "New person added", type: "success", person: personInfo});
     });
  }
});
app.listen(3000);