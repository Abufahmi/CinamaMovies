import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterconfirmComponent } from './registerconfirm.component';

describe('RegisterconfirmComponent', () => {
  let component: RegisterconfirmComponent;
  let fixture: ComponentFixture<RegisterconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
