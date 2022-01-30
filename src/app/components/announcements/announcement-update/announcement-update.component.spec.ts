import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementUpdateComponent } from './announcement-update.component';

describe('AnnouncementUpdateComponent', () => {
  let component: AnnouncementUpdateComponent;
  let fixture: ComponentFixture<AnnouncementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
