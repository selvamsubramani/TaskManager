import { Injectable } from '@angular/core';
import { Task } from './../model/task'
import { Tasks } from './../model/mock-task'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getTasks():Observable<Task[]>
  {
    return of(Tasks);
  }

  addTask(task: Task)
  {
    Tasks.push(task);
    debugger;
  }

  updateTask(task: Task)
  {
     let items = Tasks.filter(x=> x.id == task.id);
     if(items)
     {
       items[0].name = task.name;
       items[0].priority = task.priority;
       items[0].parent = task.parent;
       items[0].startDate = task.startDate;
       items[0].endDate = task.endDate;
     }
  }

  deleteTask(id: number)
  {
    let index = Tasks.findIndex(x=> x.id == id);
    Tasks.splice(index,1);
  }

  endTask(id: number)
  {
    let items = Tasks.filter(x=> x.id == id);
    if(items)
    {
      items[0].endDate = new Date();
      items[0].status = "Closed";
    }
  }
}
