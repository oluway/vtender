import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardedtenderComponent } from './awardedtender.component';

describe('AwardedtenderComponent', () => {
  let component: AwardedtenderComponent;
  let fixture: ComponentFixture<AwardedtenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardedtenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardedtenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
