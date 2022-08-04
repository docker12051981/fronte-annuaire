import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCustomFilterLtrComponent } from './smart-custom-filter-ltr.component';

describe('SmartCustomFilterLtrComponent', () => {
  let component: SmartCustomFilterLtrComponent;
  let fixture: ComponentFixture<SmartCustomFilterLtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartCustomFilterLtrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCustomFilterLtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
