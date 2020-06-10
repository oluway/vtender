import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtenderComponent } from './addtender.component';

describe('AddtenderComponent', () => {
  let component: AddtenderComponent;
  let fixture: ComponentFixture<AddtenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
