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
          //debugger;
          return (!taskname || (task.Name.toLowerCase().indexOf(taskname.toLowerCase()) > -1))
          && (!parenttaskname || (task.Parent && task.Parent.Name.toLowerCase().indexOf(parenttaskname.toLowerCase()) > -1))
          && (!frompriority || (task.Priority >= frompriority))
          && (!topriority || (task.Priority <= topriority))
          && (!startdate || (task.StartDate >= new Date(startdate)))
          && (!enddate || (task.EndDate <= new Date(enddate)));
        }
      )
    }
    return tasks;
  }

}
