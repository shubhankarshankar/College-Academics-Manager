import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyInfoAddComponent } from './faculty-info-add.component';

describe('FacultyInfoAddComponent', () => {
  let component: FacultyInfoAddComponent;
  let fixture: ComponentFixture<FacultyInfoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyInfoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyInfoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
