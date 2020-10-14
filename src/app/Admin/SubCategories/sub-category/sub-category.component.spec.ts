import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryComponent } from './sub-category.component';

describe('SubCategoryComponent', () => {
  let component: SubCategoryComponent;
  let fixture: ComponentFixture<SubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
