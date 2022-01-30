import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDetailsUpdateComponent } from './faculty-details-update.component';

describe('FacultyDetailsUpdateComponent', () => {
  let component: FacultyDetailsUpdateComponent;
  let fixture: ComponentFixture<FacultyDetailsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyDetailsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
