import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsUpdateComponent } from './student-details-update.component';

describe('StudentDetailsUpdateComponent', () => {
  let component: StudentDetailsUpdateComponent;
  let fixture: ComponentFixture<StudentDetailsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
