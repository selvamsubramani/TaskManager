import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  defaultParent: Task;
  taskId: number;
  task: Task;
  parentTasks: Task[];

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.currentTaskId.subscribe(
      data => {
        this.taskId = data;
      }
    );
    if (this.taskId > 0) {
      this.dataservice.getTaskById(this.taskId).subscribe(
        data => this.task = data,
        error => console.log(error));
      this.dataservice.getParentTasks(this.taskId).subscribe(
        data =>
          this.parentTasks = data,
        error => console.log(error));
    }
  }

  updateTask() {
    this.dataservice.updateTask(this.task);
  }

  compare(t1: Task, t2: Task) {
    return t1 && t2 ? t1.Id === t2.Id : t1 === t2;
  }
}
