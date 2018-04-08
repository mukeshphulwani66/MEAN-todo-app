import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {
    console.log("run successfully");
   }
 getTask(){
return this.http.get('http://localhost:5000/api/tasks');
 }

addTask(newTask){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }; 
   console.log(newTask);
   return this.http.post('http://localhost:5000/api/task',JSON.stringify(newTask),httpOptions)
   .pipe()
}

deleteTask(id){
  return this.http.delete('http://localhost:5000/api/task/'+id).pipe();
}
updateStatus(task){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }; 

   return this.http.put('http://localhost:5000/api/task/'+task._id,JSON.stringify(task),httpOptions)
   .pipe()
}
}
