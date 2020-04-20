import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgtPasswordComponent } from './forgt-password.component';

describe('ForgtPasswordComponent', () => {
  let component: ForgtPasswordComponent;
  let fixture: ComponentFixture<ForgtPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgtPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgtPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
