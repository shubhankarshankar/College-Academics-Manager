import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoAddComponent } from './student-info-add.component';

describe('StudentInfoAddComponent', () => {
  let component: StudentInfoAddComponent;
  let fixture: ComponentFixture<StudentInfoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentInfoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
