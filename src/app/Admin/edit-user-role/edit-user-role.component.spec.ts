import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserRoleComponent } from './edit-user-role.component';

describe('EditUserRoleComponent', () => {
  let component: EditUserRoleComponent;
  let fixture: ComponentFixture<EditUserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
