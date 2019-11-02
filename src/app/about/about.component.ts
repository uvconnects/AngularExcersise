import { Component, OnInit } from '@angular/core';
import { Leaders } from '../shared/lead';
import { LEADERS } from '../shared/leaders';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader :Leaders[]=LEADERS;
  constructor() { }

  ngOnInit() {
  }

}
