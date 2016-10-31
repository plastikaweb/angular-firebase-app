import { Component, OnInit } from '@angular/core';
import {LessonsService} from '../shared/lessons.service';
import {Lesson} from '../shared/lesson';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allLessons: Lesson[];
  filtered: Lesson[];
  constructor(private lessonsService: LessonsService) { }

  ngOnInit() {
    this.lessonsService.findAllLessons()
        .do(console.log)
        .subscribe(
            lessons => this.allLessons = this.filtered = lessons
        )
  }

}
