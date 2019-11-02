import { Component, OnInit } from '@angular/core';
import {Leaders} from '../shared/lead';
import {LeaderService} from '../services/leader.service';
@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss']
})
export class LeaderComponent implements OnInit {
  leader: Leaders[];
  constructor(private lead: LeaderService) { }

  ngOnInit() {
     this.lead.getLeaders().then(lead => this.leader = lead);
  }

}
