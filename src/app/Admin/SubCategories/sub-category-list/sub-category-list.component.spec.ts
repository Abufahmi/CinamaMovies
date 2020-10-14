import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryListComponent } from './sub-category-list.component';

describe('SubCategoryListComponent', () => {
  let component: SubCategoryListComponent;
  let fixture: ComponentFixture<SubCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
