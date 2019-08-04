import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { DataService } from './data.service';
import { Tasks } from '../model/mock-task';
import { Task } from '../model/task';

describe('DataService', () => {
  let dataservice: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule]
  }));

  beforeEach(() => {
    dataservice = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(dataservice).toBeTruthy();
  });

  it('should get all tasks', () => {

    dataservice.getTasks().subscribe(d => {
      expect(d.length).toBe(3);
      expect(d).toBe(Tasks);
    });

    const req = httpMock.expectOne(dataservice.API + "GetAllTasks");
    expect(req.request.method).toEqual('GET');
    req.flush(Tasks);
  });

  it('should get error in tasks', () => {

    let error: any;

    dataservice.getTasks().subscribe(
      res => {
      },
      e => {
        error = e;
        expect(error).toBeTruthy();
      });

    const req = httpMock.expectOne(dataservice.API + "GetAllTasks");
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('Internal error'));
  });

  it('should get one tasks', () => {

    const taskId: number = 1;
    const task = Tasks.find(t => t.Id == taskId);
    dataservice.getTaskById(taskId).subscribe(d => {
      expect(d).toBeTruthy();
      expect(d).toBe(task);
    });

    const req = httpMock.expectOne(dataservice.API + "GetTaskByTaskId/" + taskId);
    expect(req.request.method).toEqual('GET');
    req.flush(task);
  });

  it('should get no tasks', () => {

    const taskId: number = 0;
    const task: Task = Tasks.find(t => t.Id == taskId);
    dataservice.getTaskById(taskId).subscribe(d => {
      expect(d).toBeTruthy();
      expect(d).toBe(task);
    });

    const req = httpMock.expectOne(dataservice.API + "GetTaskByTaskId/" + taskId);
    expect(req.request.method).toEqual('GET');
  });

  it('should get error in get task by id', () => {

    let response: any;
    let error: any;
    const taskId: number = -1;
    const data = "No Task";
    const mockResponse = { status: 400, statusText: "Bad Request" };
    dataservice.getTaskById(taskId).subscribe(
      res => {
        response = res;
        expect(response).toEqual(data);
      },
      e => {
        error = e;
        expect(error.status).toEqual(400);
      });

    const req = httpMock.expectOne(dataservice.API + "GetTaskByTaskId/"+taskId);
    expect(req.request.method).toEqual('GET');
    req.flush(data, mockResponse);
  });

  it('should get all parent tasks', () => {

    dataservice.getParentTasks().subscribe(d => {
      expect(d.length).toBe(3);
      expect(d).toBe(Tasks);
    });

    const req = httpMock.expectOne(dataservice.API + "GetAllParentTasks/0");
    expect(req.request.method).toEqual('GET');
    req.flush(Tasks);
  });

  it('should get error in parent tasks', () => {

    let response: any;
    let error: any;

    const data = "No Parent Task";
    const mockResponse = { status: 400, statusText: "No Parent Task" };
    dataservice.getParentTasks().subscribe(
      res => {
        response = res;
        expect(response).toEqual(data);
      },
      e => {
        error = e;
        expect(error.status).toEqual(400);
      });

    const req = httpMock.expectOne(dataservice.API + "GetAllParentTasks/0");
    expect(req.request.method).toEqual('GET');
    req.flush(data, mockResponse);
  });

  it('should add task', () => {
    const task: Task = {
      Id: 1, Name: 'Task-01'
      , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
      , Priority: 5, Status: false
      , Parent: undefined
    };
    dataservice.addTask(task);

    const req = httpMock.expectOne(dataservice.API + "CreateTask");
    expect(req.request.method).toEqual('POST');
  });

  it('should not add task', () => {
    const task = {
      Id: -1, Name: 'Task-10'
      , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
      , Priority: 5, Status: false
      , Parent: undefined
    };

    dataservice.addTask(task);

    const req = httpMock.expectOne(dataservice.API + "CreateTask");
    expect(req.request.method).toEqual('POST');
    req.error(new ErrorEvent("Cannot Add"));
  });

  it('should update task', () => {
    const task: Task = {
      Id: 1, Name: 'Task-01'
      , StartDate: new Date(2019, 0, 1), EndDate: new Date(2099, 11, 31)
      , Priority: 5, Status: false
      , Parent: undefined
    };
    dataservice.updateTask(task);

    const req = httpMock.expectOne(dataservice.API + "UpdateTask");
    expect(req.request.method).toEqual('PUT');
  });

  it('should not update task', () => {
    const taskId: number = 1;
    const task = Tasks.find(t=> t.Id == taskId);

    dataservice.updateTask(task);

    const req = httpMock.expectOne(dataservice.API + "UpdateTask");
    expect(req.request.method).toEqual('PUT');
    req.error(new ErrorEvent("Cannot Update"));
  });

  it('should close task', () => {
    const taskId: number = 1;
    dataservice.endTask(taskId).subscribe(d => {
      expect(d).toBe(taskId);
    });

    const req = httpMock.expectOne(dataservice.API + "CloseTask/" + taskId);
    expect(req.request.method).toEqual('PUT');
    req.flush(taskId);
  });

  it('should not close task', () => {
    const taskId: number = 1;
    let response: any;
    let error: any;
    const data = "Cannot Close";
    const mockResponse = { status: 400, statusText: "BadRequest" };

    dataservice.endTask(taskId).subscribe(
      res => {
        response = res;
        expect(response).toEqual(data);
      },
      e => {
        error = e;
        expect(error.status).toEqual(400);
      }
    );

    const req = httpMock.expectOne(dataservice.API + "CloseTask/" + taskId);
    expect(req.request.method).toEqual('PUT');
    req.flush(data, mockResponse);
  });

  it('should delete task', () => {
    const taskId: number = 1;
    dataservice.deleteTask(taskId).subscribe(d => {
      expect(d).toBe(taskId);
    });

    const req = httpMock.expectOne(dataservice.API + "DeleteTask/" + taskId);
    expect(req.request.method).toEqual('DELETE');
    req.flush(taskId);
  });

  it('should not delete task', () => {
    const taskId: number = 1;
    let response: any;
    let error: any;
    const data = "Cannot delete";
    const mockResponse = { status: 400, statusText: "BadRequest" };

    dataservice.deleteTask(taskId).subscribe(
      res => {
        response = res;
        expect(response).toEqual(data);
      },
      e => {
        error = e;
        expect(error.status).toEqual(400);
      }
    );

    const req = httpMock.expectOne(dataservice.API + "DeleteTask/" + taskId);
    expect(req.request.method).toEqual('DELETE');
    req.flush(data, mockResponse);
  });

  it('Set task id for edit', () => {
    const taskId = 5;
    dataservice.changeTask(taskId);
    dataservice.currentTaskId.subscribe(d =>
      {
        expect(d).toBeTruthy();
        expect(d).toBe(taskId);
      })
  });

  afterEach(() => {
    httpMock.verify();
  });
});
