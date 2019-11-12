import { Component, OnInit } from '@angular/core';
import { Leaders } from '../shared/lead';
import { LEADERS } from '../shared/leaders';
import {LeaderService} from '../services/leader.service';
import {flyInOut, expand} from '../animations/app.animations';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class AboutComponent implements OnInit {
  leader :Leaders[];
  constructor(private leaderservice: LeaderService) { }

  ngOnInit() {
    this.leaderservice.getLeaders().subscribe(leaders => this.leader = leaders);
  }

}
