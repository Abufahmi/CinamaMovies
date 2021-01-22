import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinksComponent } from './edit-links.component';

describe('EditLinksComponent', () => {
  let component: EditLinksComponent;
  let fixture: ComponentFixture<EditLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
