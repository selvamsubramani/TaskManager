import { Injectable } from '@angular/core';
import { Task } from './../model/task'
import { Observable, BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API: string = environment.serviceUrl;
  taskId = new BehaviorSubject(0);
  currentTaskId = this.taskId.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  getTasks(): Observable<Task[]> {
    console.log(this.API);
    return this.http.get<Task[]>(this.API + "GetAllTasks");
  }

  getParentTasks(id: number = 0): Observable<Task[]> {
    return this.http.get<Task[]>(this.API + "GetAllParentTasks/" + id);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(this.API + "GetTaskByTaskId/" + id);
  }

  addTask(task: Task) {
    this.http.post(this.API + "CreateTask", task).
      subscribe(res => {
        console.log(res);
        this.router.navigate(['/view']);
      }, error => console.log(error));
  }

  updateTask(task: Task) {
    this.http.put(this.API + "UpdateTask", task).
      subscribe(res => {
        console.log(res);
        this.router.navigate(['/view']);
      }, error => console.log(error));
  }

  deleteTask(id: number) {
    return this.http.delete(this.API + "DeleteTask/" + id);
  }

  endTask(id: number) {
    return this.http.put(this.API + "CloseTask/" + id, null);
  }

  changeTask(id: number) {
    this.taskId.next(id);
  }
}