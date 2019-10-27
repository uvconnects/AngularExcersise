import { Injectable } from '@angular/core';
import { Leaders } from '../shared/lead';
import {LEADERS} from '../shared/leaders';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  getLeaders(): Leaders[] {
    return LEADERS;
   }
  constructor() { }

  getLeader(id: string): Leaders {
    return LEADERS.filter((lead) => (lead.id === id))[0];
  }

  getFeaturedLeaders(): Leaders {
    return LEADERS.filter((leaders) => leaders.featured)[0];
  }
}
