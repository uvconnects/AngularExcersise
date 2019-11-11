import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {Leaders} from '../shared/lead';
import {LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leaders;
  homeerrorMsg: string;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leadservice: LeaderService, @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      errorMsg => this.homeerrorMsg = <any>errorMsg); // = this.dishservice.getFeaturedDish();
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      errorMsg => this.homeerrorMsg = <any>errorMsg);
    this.leadservice.getFeaturedLeaders().subscribe(leader => this.leader = leader,
      errorMsg => this.homeerrorMsg = <any>errorMsg);
  } // this.promotion = this.promotionservice.getFeaturedPromotion();
}
