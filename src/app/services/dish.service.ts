import { Injectable, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import {DISHES} from '../shared/dishes';
import {of, Observable, } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import {ProcessHTTPMsgService} from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processhttpmsg: ProcessHTTPMsgService) { }
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processhttpmsg.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.processhttpmsg.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processhttpmsg.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(this.processhttpmsg.handleError));
  }
  putDish(dish: Dish): Observable<Dish> {
      const httpOptions = {
        headers: new  HttpHeaders({
          'Content-Type': 'application/json'
        })

      };
      return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions).pipe(catchError(this.processhttpmsg.handleError));
  }
}
