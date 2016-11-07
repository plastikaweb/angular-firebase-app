import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Lesson} from '../shared/lesson';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {
  @Input()
  lessons: Lesson[];

  @Output('lesson')
  lessonEmitter = new EventEmitter<Lesson>();

  constructor() { }

  ngOnInit() {
  }

  selectLesson(lesson: Lesson) {
    this.lessonEmitter.emit(lesson);
  }
}
