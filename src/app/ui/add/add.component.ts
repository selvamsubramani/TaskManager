import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  defaultParent: Task;
  task: Task;
  parentTasks: Task[];

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.reset();
    this.dataservice.getParentTasks()
      .subscribe(
        data => this.parentTasks = data,
        error => console.log(error));
  }

  addTask() {
    let maxTaskId = Math.max.apply(Math, this.parentTasks.map(x => x.Id));
    this.task.Id = maxTaskId + 1;
    this.dataservice.addTask(this.task);
  }

  reset() {
    this.task = new Task();
    this.task.StartDate = null;
    this.task.EndDate = null;
    this.task.Priority = 0;
  }

  compare(t1: Task, t2: Task) {
    return t1 && t2 ? t1.Id === t2.Id : t1 === t2;
  }

}
