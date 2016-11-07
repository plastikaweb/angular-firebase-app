import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CoursesComponent} from './courses/courses.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {LessonDetailComponent} from './lesson-detail/lesson-detail.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'courses', children: [
        {
            path: '',
            component: CoursesComponent
        },
        {
            path: ':id',
            component: CourseDetailComponent
        }
    ]},
    {
      path: 'lessons/:id',
        component: LessonDetailComponent
    },
    {path: '**', redirectTo: 'home'}
];

export const routing = RouterModule.forRoot( routes );

