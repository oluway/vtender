import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcompaniesComponent } from './viewcompanies.component';

describe('ViewcompaniesComponent', () => {
  let component: ViewcompaniesComponent;
  let fixture: ComponentFixture<ViewcompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
