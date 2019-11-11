import { Injectable } from '@angular/core';
import { Leaders } from '../shared/lead';
import {LEADERS} from '../shared/leaders';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }
  getLeaders(): Observable<Leaders[]> {
    return this.http.get<Leaders[]>(baseURL + 'leadership');
   }

  getLeader(id: string): Observable<Leaders> {
    return this.http.get<Leaders>(baseURL + 'leadership/' + id);
  }

  getFeaturedLeaders(): Observable<Leaders> {
    return this.http.get<Leaders[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]));
  }
}

