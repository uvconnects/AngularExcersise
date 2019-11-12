import { Component, OnInit, Inject } from '@angular/core';
import {Leaders} from '../shared/lead';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss']
})
export class LeaderComponent implements OnInit {
  leader: Leaders[];
  leaderrormsg: string;
  constructor(private lead: LeaderService, @Inject('baseURL') private baseURL) { }

  ngOnInit() {
     this.lead.getLeaders().subscribe(lead => this.leader = lead,
      errorMsg => this.leaderrormsg = <any>errorMsg);
  }

}
