import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccessdeniedComponent } from './accessdenied.component';

describe('AccessdeniedComponent', () => {
  let component: AccessdeniedComponent;
  let fixture: ComponentFixture<AccessdeniedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessdeniedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessdeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
