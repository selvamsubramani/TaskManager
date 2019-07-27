export class Task {
    Id: number;
    Name: string;
    Parent: Task;
    StartDate: Date;
    EndDate: Date;
    Status: boolean;
    Priority: number;
}