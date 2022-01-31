import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyClassesComponent } from './faculty-classes.component';

describe('FacultyClassesComponent', () => {
  let component: FacultyClassesComponent;
  let fixture: ComponentFixture<FacultyClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
