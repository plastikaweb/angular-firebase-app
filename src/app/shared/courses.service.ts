import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from './course';
import {AngularFireDatabase} from 'angularfire2';
import {Lesson} from './lesson';

@Injectable()
export class CoursesService {
    constructor(private db: AngularFireDatabase) {
    }

    findAllCourses(): Observable<Course[]> {
        return this.db.list( 'courses' )
            .map( Course.fromJsonÄrray );
    }

    findCourseByUrl(courseUrl: string): Observable<Course> {
        return this.db.list( 'courses', {
            query: {
                orderByChild: 'url',
                equalTo: courseUrl
            }
        } )
            .map( results => results[0] );
    }

    findLessonKeysPerCourseUrl(courseUrl: string) : Observable<string[]> {
        return this.findCourseByUrl(courseUrl)
            .switchMap( course => this.db.list( 'lessonsPerCourse/' + course.$key ) )
            .map(lspc => lspc.map(lpc => lpc.$key));
    }

    findLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
        return this.findLessonKeysPerCourseUrl(courseUrl)
            .map( lspc => lspc.map( lessonKey => this.db.object( 'lessons/' + lessonKey ) ) )
            .flatMap( fbojs => Observable.combineLatest( fbojs ) );
    }

}
