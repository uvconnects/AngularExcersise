import { Component, OnInit } from '@angular/core';
import { Leaders } from '../shared/lead';
import { LEADERS } from '../shared/leaders';
import {LeaderService} from '../services/leader.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader :Leaders[];
  constructor(private leaderservice: LeaderService) { }

  ngOnInit() {
    this.leaderservice.getLeaders().then(leaders => this.leader = leaders);
  }

}
