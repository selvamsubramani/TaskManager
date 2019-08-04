import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of, BehaviorSubject } from 'rxjs';

import { EditComponent } from './edit.component';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/service/data.service';
import { DebugElement } from '@angular/core';
import { Tasks } from 'src/app/model/mock-task';

describe('EditComponent', () => {

  class MockDataService {
    taskId = new BehaviorSubject(0);
    currentTaskId = this.taskId.asObservable();

    Tasks: Task[] =
      [
        {
          Id: 1, Name: 'Task-01'
          , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
          , Priority: 5, Status: false
          , Parent: undefined
        },
        {
          Id: 2, Name: 'Task-02'
          , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
          , Priority: 10, Status: false
          , Parent: {
            Id: 1, Name: 'Task-01'
            , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
            , Priority: 5, Status: false
            , Parent: null
          }
        },
        {
          Id: 3, Name: 'Task-03'
          , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
          , Priority: 15, Status: false
          , Parent: {
            Id: 1, Name: 'Task-01'
            , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
            , Priority: 5, Status: false
            , Parent: null
          }
        },
      ];

    getTaskById(id: number): Observable<Task> {
      return of(this.Tasks.find(t => t.Id == id));
    }

    getParentTasks(id: number): Observable<Task[]> {
      return of(this.Tasks);
    }

    updateTask(task: Task) {
      const editTask = this.Tasks.find(t => t.Id == task.Id);
      editTask.Name = task.Name;
      editTask.Parent = task.Parent;
      editTask.Priority = task.Priority;
    }
  }

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let debugElement: DebugElement;
  let service: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [EditComponent],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    service = debugElement.injector.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task & parent tasks', () => {
    service.taskId.next(1);
    component.ngOnInit();
    expect(component.parentTasks).toBeTruthy();
    expect(component.task).toBeTruthy();
  });

  it('should update task', () => {
    service.taskId.next(1);
    component.ngOnInit();
    component.task.Name = "Task-01-Edit";
    component.updateTask();
    expect(component.task).toBeTruthy();
    expect(component.task.Name).toEqual("Task-01-Edit");
  });

  it('compare tasks', () => {
    let t1: Task;
    let t2: Task;
    const res = component.compare(t1, t2);
    expect(res).toEqual(true);
  });

  it('compare tasks', () => {
    let t1: Task = Tasks.find(t => t.Id == 1);
    let t2: Task = Tasks.find(t => t.Id == 1);
    const res = component.compare(t1, t2);
    expect(res).toEqual(true);
  });

});
