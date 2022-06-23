import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  showEditTask: boolean = false;
  subscription!: Subscription;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggleEdit()
      .subscribe((value) => (this.showEditTask = value));
  }

  ngOnInit(): void {}

  onToggleEditTask(task: Task) {
    this.onEditTask.emit(task);
    this.uiService.toggleEditTask();
  }

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }
}
