import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private subjectAdd = new Subject<any>();
  private subjectEdit = new Subject<any>();
  private showEditTask: boolean = false;

  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subjectAdd.next(this.showAddTask);
  }

  toggleEditTask(): void {
    this.showEditTask = !this.showEditTask;
    this.subjectEdit.next(this.showEditTask);
  }

  onToggleEdit(): Observable<any> {
    return this.subjectEdit.asObservable();
  }

  onToggle(): Observable<any> {
    return this.subjectAdd.asObservable();
  }
}
