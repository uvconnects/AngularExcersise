import { Injectable } from '@angular/core';
import { FeedBack, ContactType } from '../shared/feedback';
import {of, Observable, } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProcessHTTPMsgService} from '../services/process-httpmsg.service';
import { delay, map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseURL';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient,  private processhttpmsg: ProcessHTTPMsgService) { }
  getContacts(): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(baseURL + 'feedback').pipe(catchError(this.processhttpmsg.handleError));
  }

  getContactsitem(id: number): Observable<FeedBack> {
    return this.http.get<FeedBack>(baseURL + 'feedback/' + id).pipe(catchError(this.processhttpmsg.handleError));
  }
  putcontacts(feedback: FeedBack): Observable<FeedBack> {
    const httpOptions = {
      headers: new  HttpHeaders({
        'Content-Type': 'application/json'
      })

    };
    return this.http.post<FeedBack>(baseURL + 'feedback/', feedback, httpOptions)
    .pipe(delay(5000)).pipe(catchError(this.processhttpmsg.handleError));
}
}
