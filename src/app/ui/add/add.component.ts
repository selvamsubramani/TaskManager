import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  task: Task;
  parentTasks: Task[];

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.reset();
    this.dataservice.getTasks()
      .subscribe(
        data => this.parentTasks = data,
        error => console.log(error));
  }

  addTask() {
    this.dataservice.addTask(this.task);
  }

  reset() {
    this.task = new Task();
    this.task.StartDate = null;
    this.task.EndDate = null;
    this.task.Priority = 0;
    this.task.Parent = new Task();
  }

}
