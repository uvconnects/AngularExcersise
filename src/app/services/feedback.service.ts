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
export class FeedbackService {

  constructor(private http: HttpClient,  private processhttpmsg: ProcessHTTPMsgService) { }
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
