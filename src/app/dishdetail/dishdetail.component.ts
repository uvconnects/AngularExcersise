import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {visibility, flyInOut, expand} from '../animations/app.animations';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations: [
    visibility(), flyInOut(), expand()
  ]
})
export class DishdetailComponent implements OnInit {
  dishfeedform: FormGroup;
  errorMsg: string;
  dishErrorMsg: string;
  visibility='shown';
  @ViewChild('slider', { static: true }) slider;
  @ViewChild('fform', { static: false }) feedbackFormDirect: any;
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
    }
  };
  dish: Dish;
  rating1: number;
  dishIds: string[];
  prev: string;
  next: string;
  resetvalue = 5;
  dishcopy: Dish;
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder, @Inject('baseURL') private baseURL) {
    this.createForm();
  }
  createForm() {
    this.dishfeedform = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', Validators.required],
      rating: ['']
    });
    this.dishfeedform.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.dishfeedform) { return; }
    const form = this.dishfeedform;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);

      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => this.errorMsg = <any>errmess);

  }
  formatLabel(value: number) {
    if (value >= 1) {
      return Math.round(value / 500);
    }
    return value;
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf((dishId));
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length]
  }
  goBack(): void {
    this.location.back();
  }
  onSubmit() {
    this.dishfeedform.value.date = new Date().toDateString();
    this.dishcopy.comments.push(this.dishfeedform.value);
    this.dishservice.putDish(this.dishcopy).subscribe(dish => {
      this.dish = dish; this.dishcopy = dish;
      errorMsg => { this.dish = null; this.dishcopy = null; this.errorMsg = <any>errorMsg; }
    });
    this.dishfeedform.reset({
      author: '',
      comment: ''
    });

    this.feedbackFormDirect.resetForm();
    this.resetvalue = 5;
  }
}