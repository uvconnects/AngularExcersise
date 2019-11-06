import { Injectable } from '@angular/core';
import { Leaders } from '../shared/lead';
import {LEADERS} from '../shared/leaders';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  getLeaders(): Observable<Leaders[]> {
    return of(LEADERS).pipe(delay(2000)); // .toPromise();
 /*    return Promise.resolve(LEADERS); */
   }
  constructor() { }

  getLeader(id: string): Observable<Leaders> {
    return of(LEADERS.filter((lead) => (lead.id === id))[0]).pipe(delay(2000)); //.toPromise();
    /*return Promise.resolve(LEADERS.filter((lead) => (lead.id === id))[0]);*/
  }

  getFeaturedLeaders(): Observable<Leaders> {
    return of(LEADERS.filter((leaders) => leaders.featured)[0]).pipe(delay(2000)); //.toPromise();
  /*   return Promise.resolve(LEADERS.filter((leaders) => leaders.featured)[0]); */
  }
}
