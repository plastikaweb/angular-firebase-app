import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../shared/courses.service';
import {Observable} from 'rxjs';
import {Course} from '../shared/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Observable<Course[]>;
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.findAllCourses();
  }

}
