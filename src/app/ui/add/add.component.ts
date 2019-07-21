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

  constructor(private dataservice:DataService) { }

  ngOnInit() 
  {
    this.reset();
    this.parentTasks = new Array();
  }

  addTask()
  {

  }

  reset()
  {
    this.task = new Task();
  }

}
