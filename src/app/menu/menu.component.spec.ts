import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {RouterTestingModule} from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseURL';
import { Observable } from 'rxjs';
import { DISHES } from '../shared/dishes';
import {of } from 'rxjs';
import { Dish } from '../shared/dish';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const dishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return of(DISHES);
      }
    }
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([{path: 'menu', component: MenuComponent}])
      ],
      providers: [{provide: DishService, useValue: dishServiceStub},
      {provide: 'BaseUrl', useValue: baseURL}],

    })
    .compileComponents();
    const dishservice = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
