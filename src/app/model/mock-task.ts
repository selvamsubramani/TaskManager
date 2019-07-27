import { Task } from './task'

export const Tasks: Task[] =
[
    { Id: 1, Name: 'Task-01'
    , StartDate: new Date(2019,0,1), EndDate: new Date(2099,11,31)
    , Priority:5, Status: false
    , Parent: {
        Id: 0, Name: 'Parent-Task-01'
        , StartDate: new Date(2019,0,1), EndDate: new Date(2099,11,31)
        , Priority:5, Status: false
        , Parent: null
        }
    },
    { Id: 2, Name: 'Task-02'
    , StartDate: new Date(2019,0,1), EndDate: new Date(2099,11,31)
    , Priority:10, Status: false
    , Parent: {
        Id: 0, Name: 'Parent-Task-01'
        , StartDate: new Date(2019,0,1), EndDate: new Date(2099,11,31)
        , Priority:5, Status: false
        , Parent: null
        }
    },
    { Id: 3, Name: 'Task-03'
    , StartDate: new Date(2019,0,1), EndDate: new Date(2099,11,31)
    , Priority:15, Status: false
    , Parent: null },
];
