import { SearchPipe } from './search.pipe';
import { Tasks } from '../model/mock-task';
import { Task } from '../model/task';

describe('SearchPipe', () => {

  let pipe: SearchPipe;
  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Search task by task name', () => {
    const name: string = "Task-01";
    const tasks: Task[] = pipe.transform(Tasks, 
      name, 
      undefined,
      undefined,
      undefined,
      undefined,
      undefined)
    expect(tasks).toBeTruthy();
    expect(tasks.length).toEqual(1);
    expect(tasks[0].Name).toEqual(name);
  });

  it('Search task by parent task name', () => {
    const name: string = "Task-01";
    const tasks: Task[] = pipe.transform(Tasks, 
      undefined,
      name, 
      undefined,
      undefined,
      undefined,
      undefined)
    expect(tasks).toBeTruthy();
    expect(tasks.length).toEqual(2);
    expect(tasks[0].Parent.Name).toEqual(name);
    expect(tasks[1].Parent.Name).toEqual(name);
  });

});
