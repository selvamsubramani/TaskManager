import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: any[], taskname: string, parenttaskname: string): any[] {
    if(tasks && tasks.length > 0 && (taskname || parenttaskname))
    {
      return tasks.filter(
        task => 
        {
          return (!taskname || (taskname && task.name.toLowerCase().indexOf(taskname.toLowerCase()) > 0))
          && (!parenttaskname || (parenttaskname && task.parent && task.parent.name.toLowerCase().indexOf(parenttaskname.toLowerCase()) > 0));
        }
      )
    }
    return tasks;
  }

}
