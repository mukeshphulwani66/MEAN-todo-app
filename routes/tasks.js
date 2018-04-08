var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

// put your database link here
var db = mongojs('mongodb://something:something@something/dbname',['tasks']);
/* 
/** IF USING mongoose instead of mongojs

var db = require('mongoose');
db.connect('mongodb://something:something@something/dbname');
db.Promise = global.Promise;
var tasksh = db.Schema({
  title: String,
    isDone: Boolean
});

var Task = db.model('tasks',tasksh);
*/
//get all files in db
router.get('/tasks',function(req,res,next){
   db.tasks.find(function(err,data){
       if(err) res.send(err);
       else res.json(data);
   });
});
// get single file
router.get('/task/:id',function(req,res,next){
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,data){
        if(err) res.send(err);
        else res.json(data);
    });
 });
//save task

router.post('/task',function(req,res,next){
   var data = req.body;
   if(!data.title || !(data.isDone+'')){
       res.status(400);
       res.json({
         "error" : "bad move"
       });
   }else{
       db.tasks.save(data,function(err,task){
           if(err)  res.send(err);
           else res.json(data);
           
       });
   }
 });
//delete file
router.delete('/task/:id',function(req,res,next){
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,data){
        if(err) res.send(err);
        else res.json(data);
    });
 });
//update it
router.put('/task/:id',function(req,res,next){
var data = req.body;
var updTask = {};

if(data.isDone){
    updTask.isDone = data.isDone;
}

if(data.title){
    updTask.title = data.title;
}

if(!updTask){
    res.status(400);
    res.json({
        "error":"bad move"
    })
}else{
    db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updTask,{},function(err,data){
        if(err) res.send(err);
        else res.json(data);
    });

}

    
 });

module.exports = router;
