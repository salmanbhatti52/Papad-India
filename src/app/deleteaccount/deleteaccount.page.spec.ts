import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteaccountPage } from './deleteaccount.page';

describe('DeleteaccountPage', () => {
  let component: DeleteaccountPage;
  let fixture: ComponentFixture<DeleteaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
