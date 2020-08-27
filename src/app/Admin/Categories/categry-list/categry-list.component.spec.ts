import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategryListComponent } from './categry-list.component';

describe('CategryListComponent', () => {
  let component: CategryListComponent;
  let fixture: ComponentFixture<CategryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
