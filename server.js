var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();
var port = 5000;
//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//handle static file means our frontend
//app.use(express.static(path.join(__dirname,'client')));

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//for dist folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/',index);
app.use('/api',tasks);

app.listen(process.env.PORT || port,function(){
    console.log(`runnig on ${port}`);
})
