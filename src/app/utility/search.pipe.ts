import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: any[], taskname: string, parenttaskname: string
  , frompriority: number, topriority: number
  , startdate: Date, enddate: Date): any[] {
    if(tasks && tasks.length > 0 && 
      (taskname || parenttaskname || frompriority || topriority || startdate || enddate))
    {
      return tasks.filter(
        task => 
        {
          return (!taskname || (task.name.toLowerCase().indexOf(taskname.toLowerCase()) > -1))
          && (!parenttaskname || (task.parent && task.parent.name.toLowerCase().indexOf(parenttaskname.toLowerCase()) > -1))
          && (!frompriority || (task.priority >= frompriority))
          && (!topriority || (task.priority <= topriority))
          && (!startdate || (task.startDate >= new Date(startdate)))
          && (!enddate || (task.endDate <= new Date(enddate)));
        }
      )
    }
    return tasks;
  }

}
