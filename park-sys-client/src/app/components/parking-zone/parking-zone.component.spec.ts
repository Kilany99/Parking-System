import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingZoneComponent } from './parking-zone.component';

describe('ParkingZoneComponent', () => {
  let component: ParkingZoneComponent;
  let fixture: ComponentFixture<ParkingZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
