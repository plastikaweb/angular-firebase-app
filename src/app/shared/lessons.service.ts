import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Lesson} from './lesson';
import {AngularFireDatabase} from 'angularfire2';

@Injectable()
export class LessonsService {

    constructor(private db: AngularFireDatabase) {
    }

    findAllLessons(): Observable<Lesson[]> {
        return this.db.list( 'lessons' )
            .map( Lesson.fromJsonList );
    }

    findLessonByUrl(url: string): Observable<Lesson> {
        return this.db.list( 'lessons', {
            query: {
                orderByChild: 'url',
                equalTo: url
            }
        } )
            .filter( lesson => !!lesson )
            .map( lesson => ( lesson[0] ) );
    }

    loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
        return this.db.list( 'lessonsPerCourse/' + courseId, {
            query: {
                orderByKey: true,
                startAt: lessonId,
                limitToFirst: 2
            }
        } )
            .filter( results => !!results )
            .map( results => results[1].$key )
            .switchMap( lessonId => this.db.object( 'lessons/' + lessonId ) );
    }

    loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
        return this.db.list( 'lessonsPerCourse/' + courseId, {
            query: {
                orderByKey: true,
                endAt: lessonId,
                limitToLast: 2
            }
        } )
            .filter( results => !!results )
            .map( results => results[0].$key )
            .switchMap( lessonId => this.db.object( 'lessons/' + lessonId ) );
    }

}
