import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from './course';
import {AngularFireDatabase} from 'angularfire2';
import {Lesson} from './lesson';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';

@Injectable()
export class CoursesService {
    currentCourse: Course;

    constructor(private db: AngularFireDatabase) {
    }

    findAllCourses(): Observable<Course[]> {
        return this.db.list( 'courses' )
            .map( Course.fromJsonÄrray );
    }

    findCourseByUrl(courseUrl: string): Observable<Course> {
        return this.db.list( 'courses')
            .map( results => results[0]);
    }

    findLessonKeysPerCourseUrl(courseUrl: string,
                               query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findCourseByUrl( courseUrl )
            .switchMap( course => {
                console.log(course);
                this.currentCourse = course || this.currentCourse;
                return this.db.list( 'lessonsPerCourse/' + this.currentCourse.$key, query )
            } )
            .map( lspc => lspc.map( lpc => lpc.$key ) );
    }

    findLessonsForLessonKeys(lessonKeys: Observable<string[]>): Observable<Lesson[]> {
        return lessonKeys
            .map( lspc => lspc.map( lessonKey => this.db.object( 'lessons/' + lessonKey ) ) )
            .flatMap( fbojs => Observable.combineLatest( fbojs ) );
    }

    findLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
        return this.findLessonsForLessonKeys( this.findLessonKeysPerCourseUrl( courseUrl ) );
    }

    loadFirstLessonsPage(courseUrl: string, items: number): Observable<Lesson[]> {

        const firstPageLessonKeys = this.findLessonKeysPerCourseUrl( courseUrl, {
            query: {
                limitToFirst: items
            }
        } );

        return this.findLessonsForLessonKeys( firstPageLessonKeys );
    }

    loadNextPage(courseUrl: string,
                 lessonKey: string,
                 items: number): Observable<Lesson[]> {
        const lessonKeys = this.findLessonKeysPerCourseUrl( courseUrl, {
            query: {
                orderByKey: true,
                startAt: lessonKey,
                limitToFirst: items + 1
            }
        } );

        return this.findLessonsForLessonKeys( lessonKeys )
            .map( lessons => lessons.slice( 1, lessons.length ) );
    }

    loadPreviousPage(courseUrl: string,
                     lessonKey: string,
                     items: number): Observable<Lesson[]> {
        const lessonKeys = this.findLessonKeysPerCourseUrl( courseUrl, {
            query: {
                orderByKey: true,
                endAt: lessonKey,
                limitToLast: items + 1
            }
        } );

        return this.findLessonsForLessonKeys( lessonKeys )
            .map( lessons => lessons.slice( 0,  lessons.length - 1) );
    }

}
