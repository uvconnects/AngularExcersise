import { Injectable } from '@angular/core';
import { Leaders } from '../shared/lead';
import {LEADERS} from '../shared/leaders';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  getLeaders(): Promise<Leaders[]> {
    return Promise.resolve(LEADERS);
   }
  constructor() { }

  getLeader(id: string): Promise<Leaders> {
    return Promise.resolve(LEADERS.filter((lead) => (lead.id === id))[0]);
  }

  getFeaturedLeaders(): Promise<Leaders> {
    return Promise.resolve(LEADERS.filter((leaders) => leaders.featured)[0]);
  }
}
