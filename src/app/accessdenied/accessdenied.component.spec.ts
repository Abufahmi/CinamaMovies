import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessdeniedComponent } from './accessdenied.component';

describe('AccessdeniedComponent', () => {
  let component: AccessdeniedComponent;
  let fixture: ComponentFixture<AccessdeniedComponent>;

  beforeEach(async(() => {
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
