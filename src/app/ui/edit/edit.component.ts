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
  
  constructor(private dataservice:DataService) { }

  ngOnInit() 
  {
    this.task = new Task();
    this.parentTasks = new Array();
  }
  updateTask()
  {
    
  }
  cancel()
  {

  }
}
