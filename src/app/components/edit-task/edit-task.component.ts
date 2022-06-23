import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();
  @Output() onCancelEdit: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder!: boolean;
  showEditTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggleEdit()
      .subscribe((value) => (this.showEditTask = value));
  }

  ngOnInit(): void {}

  onCancel(task: Task) {
    this.onCancelEdit.emit(task);
    this.uiService.onToggleEdit();
  }

  onSubmit() {
    if (!this.text) {
      alert('The "Title" field may not be empty');
      return;
    }

    const updatedTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onUpdateTask.emit(updatedTask);
  }
}
