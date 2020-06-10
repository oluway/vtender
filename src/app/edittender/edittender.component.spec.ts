import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittenderComponent } from './edittender.component';

describe('EdittenderComponent', () => {
  let component: EdittenderComponent;
  let fixture: ComponentFixture<EdittenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
