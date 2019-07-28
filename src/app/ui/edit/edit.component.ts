import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  task: Task;
  parentTasks: Task[];

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.getTaskById(2).subscribe(
      data => this.task = data,
      error => console.log(error));
    this.dataservice.getTasks().subscribe(
      data => this.parentTasks = data,
      error => console.log(error));
      debugger;
  }

  updateTask() {
debugger;
  }
  cancel() {

  }
}
