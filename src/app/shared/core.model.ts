import { empty } from "rxjs/Observer";

export class UserRequest {
    requestId:number = 0;
    reqDate: string = '';
    createdBy: string = '';
    createdDept: string = '';
    subject: string = '';
    desc: string = '';
    userId: number = 0;
    actionBy: string = '';
    completedBy : string = "";
    completedOn : string = "";
    actionNote : string = "";
    status: number = 0;
    
    constructor(_requestId:number = 0, _reqDate: string = "", _createdBy : string = "", _createdDept : string = "", _subject : string ="", 
        _desc: string = "", _userId: number = 0, _actionBy : string = "", 
        _completedBy : string = "", _completedOn: string = "", _actionNote : string = "",
        _status: number = 0) {
        this.requestId = _requestId;
        this.reqDate = _reqDate;
        this.createdBy = _createdBy;
        this.createdDept = _createdDept;
        this.desc = _desc || '';
        this.subject = _subject;
        this.userId = _userId;
        this.actionBy = _actionBy;
        this.completedBy = _completedBy;
        this.completedOn = _completedOn;
        this.actionNote = _actionNote;
        this.status = _status;
       
    }   
}
