import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActorsComponent } from './edit-actors.component';

describe('EditActorsComponent', () => {
  let component: EditActorsComponent;
  let fixture: ComponentFixture<EditActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
