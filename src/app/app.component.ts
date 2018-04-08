import { Component } from '@angular/core';
import { TaskService } from './task.service';
import {Task }from '../Task'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 providers:[TaskService]
})
 


export class AppComponent {
 // title = 'app';

  // Task = {
  //    title:String,
  //    isDone:Boolean
  //  };
   tasks:Task[];
   title:String;  

 constructor(private taskService:TaskService){
   this.taskService.getTask()
   .subscribe((data:any) =>{
     console.log(data); 
   this.tasks = data
     console.log(this.tasks);
   });
 }
 

addTask(event){
  event.preventDefault();
  console.log(this.title);
   var newTask = {
     title:this.title,
     isDone:false
   }
   this.taskService.addTask(newTask)
   .subscribe((task:any)=>{
     this.tasks.push(task);
     this.title='';
   });
  // this.tasks.push(newTask);

}

deleteTask(id){
  var tasks:any  =this.tasks;
  this.taskService.deleteTask(id).subscribe((data:any) =>{
   if(data.n==1){
     for(var i=0;i<tasks.length;i++){
        if(tasks[i]._id == id){
          tasks.splice(i,1);
        }
     }
   }
  });
}

updateStatus(task){
  var _task = {
    _id:task._id,
    title:task.title,
    isDone:!task.isDone
  }
this.taskService.updateStatus(_task).subscribe(data=>{
  task.isDone = !task.isDone;
});


}

}
