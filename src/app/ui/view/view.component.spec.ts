import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { SearchPipe } from './../../utility/search.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of } from 'rxjs';

import { ViewComponent } from './view.component';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/service/data.service';
import { DebugElement } from '@angular/core';

describe('ViewComponent', () => {

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

    getTasks(): Observable<Task[]> {
      return of(this.Tasks);
    }

    endTask(id: number): Observable<any> {
      const tasks = this.Tasks;
      const task = tasks.find(t => t.Id == id);
      task.Status = true;
      return of("Task is closed");
    }

    deleteTask(id: number): Observable<any> {
      const tasks = this.Tasks;
      const index = tasks.findIndex(t => t.Id == id);
      tasks.splice(index, 1);
      return of("Task is deleted");
    }

    changeTask(id: number) {
    }    
  }
  
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let debugElement: DebugElement;
  let service: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [
        ViewComponent,
        SearchPipe],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    service = debugElement.injector.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks', () => {
    component.ngOnInit();
    expect(component.tasks).toBeTruthy();
    expect(component.tasks.length).toBeTruthy(3);
  });

  it('should close tasks', () => {
    const taskId = 1;
    component.endTask(taskId);
    const task = component.tasks.find(t => t.Id == taskId);
    expect(task).toBeTruthy();
    expect(task.Status).toEqual(true);
  });

  it('should delete tasks', () => {
    const taskId = 3;
    component.deleteTask(taskId);
    const task = component.tasks.find(t => t.Id == taskId);
    expect(component.tasks.length).toEqual(2);
    expect(task).toBeUndefined();
  });

  it('should initiate edit task', () => {
    const taskId = 1;
    component.editTask(taskId);
    const task = component.tasks.find(t => t.Id == taskId);
    expect(task).toBeTruthy();
  });
  // it('should load tasks', () => {
  //   const getTasksSpy = spyOn(service, 'getTasks').and.callThrough();
  //   component.ngOnInit();
  //   expect(getTasksSpy).toHaveBeenCalled();
  // });

  // it('should end tasks', () => {
  //   const endTaskSpy = spyOn(service, 'endTask').and.callThrough();
  //   console.log(debugElement);
  //   debugElement.query(x=> x.name == 'edit').triggerEventHandler('click');
  //   // expect(component.tasks).toBeTruthy();
  //   // expect(component.tasks.length).toBe(3);
  // });
});
