import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  taskId: number;
  task: Task;
  parentTasks: Task[];

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.currentTaskId.subscribe(
      data => {
        this.taskId = data;
        console.log(this.taskId);
      }
    );
    if (this.taskId > 0) {
      this.dataservice.getTaskById(this.taskId).subscribe(
        data => this.task = data,
        error => console.log(error));
      this.dataservice.getTasks().subscribe(
        data =>
          this.parentTasks = data,
        error => console.log(error));
    }
  }

  updateTask() {
    this.dataservice.updateTask(this.task);
  }
  
  cancel() {

  }
}
