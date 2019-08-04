import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';

import { AddComponent } from './add.component';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/service/data.service';
import { DebugElement } from '@angular/core';
import { Tasks } from 'src/app/model/mock-task';
import { error } from '@angular/compiler/src/util';

describe('AddComponent', () => {

  class MockDataService {

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

    getParentTasks(id: number): Observable<Task[]> {
      return of(this.Tasks);
    }

    addTask(task: Task) {
        this.Tasks.push(task);
    }
  }

  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [AddComponent],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load parent tasks', () => {
    component.ngOnInit();
    expect(component.parentTasks).toBeTruthy();
  });

  it('should add task', () => {
    component.task = {
      Id: 10, Name: 'Task-10'
      , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
      , Priority: 5, Status: false
      , Parent: undefined
    };
    component.addTask();
    expect(component.task).toBeTruthy();
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
