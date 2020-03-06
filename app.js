var express = require("express");
var app = express();
var mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/mcqnode",  { useNewUrlParser: true });

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

var mcqSchema = new mongoose.Schema({
    qno: Number,    
    question: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String
});

var Mcq = mongoose.model("Mcq", mcqSchema);

var mcq1 = [{
    qno: 1,
    question: "This is question number 1. Can you answer it?",
    optionA: "Option No 1",
    optionB: "Option No 2",
    optionC: "Option No 3",
    optionD: "Option No 4"
}];

/*Mcq.create(mcq1 , function(err,mcq1){
    if(err){
        console.log(err);
    } else {
        console.log("mcq added");
    }
})*/

app.get('/',function(req,res){
    Mcq.find({},function(err,mcqs){
        if(err){

        } else{
            res.render("index",{mcqs:mcqs});
        }
    })
});

app.listen(3000, function(){
    console.log("MCQ App has Started");
});
