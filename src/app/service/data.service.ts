import { Injectable } from '@angular/core';
import { Task } from './../model/task'
import { Tasks } from './../model/mock-task'
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API:string = "http://localhost:49568/taskmanagerservice/task/";

  constructor(private http: HttpClient) { }

  getTasks() : Observable<Task[]>
  {
    // API Call
    //return this.http.get<Task[]>(this.API + "GetAllTasks"); - API Call
    return of(Tasks);
  }

  getTaskById(id: number) : Observable<Task>
  {
    // API Call
    // this.http.get<Task>(this.API + "GetTaskByTaskId" + id);
    return of(Tasks.find(t => t.Id == id));
  }

  addTask(task: Task)
  {
    // API Call
    // this.http.post(this.API + "CreateTask", task);
    Tasks.push(task);
  }

  updateTask(task: Task)
  {
    // API Call
    // this.http.put(this.API + "UpdateTask", task);

     let items = Tasks.filter(x=> x.Id == task.Id);
     if(items)
     {
       items[0].Name = task.Name;
       items[0].Priority = task.Priority;
       items[0].Parent = task.Parent;
       items[0].StartDate = task.StartDate;
       items[0].EndDate = task.EndDate;
     }
  }

  deleteTask(id: number)
  {
    // API Call
    // this.http.delete(this.API + "CloseTask/" + id);
    let index = Tasks.findIndex(task=> task.Id == id);
    Tasks.splice(index,1);
  }

  endTask(id: number)
  {
    // API Call
    // this.http.put(this.API + "CloseTask", id);
    let items = Tasks.filter(task=> task.Id == id);
    if(items)
    {
      items[0].EndDate = new Date();
      items[0].Status = true;
    }
  }
}
