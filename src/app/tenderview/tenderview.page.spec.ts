import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TenderviewPage } from './tenderview.page';

describe('TenderviewPage', () => {
  let component: TenderviewPage;
  let fixture: ComponentFixture<TenderviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TenderviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
