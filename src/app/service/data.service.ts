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
}
