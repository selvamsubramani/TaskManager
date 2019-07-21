import { Task } from './task'

export const Tasks: Task[] =
[
    { id: 1, name: 'Task-01'
    , startDate: new Date(2019,0,1), endDate: new Date(2099,11,31)
    , priority:5, status: 'open'
    , parent: {
        id: 0, name: 'Parent-Task-01'
        , startDate: new Date(2019,0,1), endDate: new Date(2099,11,31)
        , priority:5, status: 'open'
        , parent: null
        }
    },
    { id: 2, name: 'Task-02'
    , startDate: new Date(2019,0,1), endDate: new Date(2099,11,31)
    , priority:10, status: 'open'
    , parent: {
        id: 0, name: 'Parent-Task-01'
        , startDate: new Date(2019,0,1), endDate: new Date(2099,11,31)
        , priority:5, status: 'open'
        , parent: null
        }
    },
    { id: 3, name: 'Task-03'
    , startDate: new Date(2019,0,1), endDate: new Date(2099,11,31)
    , priority:15, status: 'open'
    , parent: null },
];
