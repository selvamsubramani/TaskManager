import { Component, OnInit } from '@angular/core';
import { Task } from './../../model/task'
import { DataService } from './../../service/data.service'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  tasks: Task[];

  taskName: string;
  parentTaskName: string;
  priorityFrom: number;
  priorityTo: number;
  startDate: Date;
  endDate: Date;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.dataservice.getTasks().
      subscribe(
        data => this.tasks = data,
        error => console.log(error));
  }

  endTask(id: number) {
    this.dataservice.endTask(id).
      subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => console.log(error));
  }

  deleteTask(id: number) {
    this.dataservice.deleteTask(id).
      subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => console.log(error));
  }

  editTask(id: number) {
    this.dataservice.changeTask(id);
  }

}
