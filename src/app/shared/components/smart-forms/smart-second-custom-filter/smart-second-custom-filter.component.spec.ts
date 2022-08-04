import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSecondCustomFilterComponent } from './smart-second-custom-filter.component';

describe('SmartSecondCustomFilterComponent', () => {
  let component: SmartSecondCustomFilterComponent;
  let fixture: ComponentFixture<SmartSecondCustomFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartSecondCustomFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSecondCustomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
