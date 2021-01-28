import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActorListComponent } from './movie-actor-list.component';

describe('MovieActorListComponent', () => {
  let component: MovieActorListComponent;
  let fixture: ComponentFixture<MovieActorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieActorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieActorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
