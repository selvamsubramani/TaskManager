import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: any[], taskname: string, parenttaskname: string
    , frompriority: number, topriority: number
    , startdate: Date, enddate: Date): any[] {
    if (tasks && tasks.length > 0 &&
      (taskname || parenttaskname || frompriority || topriority || startdate || enddate)) {
      return tasks.filter(
        task => {
          return (!taskname || (task.Name.toLowerCase().indexOf(taskname.toLowerCase()) > -1))
            && (!parenttaskname || (task.Parent && task.Parent.Name.toLowerCase().indexOf(parenttaskname.toLowerCase()) > -1))
            && (!frompriority || (task.Priority >= frompriority))
            && (!topriority || (task.Priority <= topriority))
            && (!startdate || (new Date(task.StartDate.substring(0, 10)) >= new Date(startdate)))
            && (!enddate || (new Date(task.EndDate.substring(0, 10)) <= new Date(enddate)));
        }
      )
    }
    return tasks;
  }
}