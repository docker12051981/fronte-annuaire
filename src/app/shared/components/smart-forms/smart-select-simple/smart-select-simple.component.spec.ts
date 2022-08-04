import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSelectSimpleComponent } from './smart-select-simple.component';

describe('SmartSelectSimpleComponent', () => {
  let component: SmartSelectSimpleComponent;
  let fixture: ComponentFixture<SmartSelectSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartSelectSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSelectSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
