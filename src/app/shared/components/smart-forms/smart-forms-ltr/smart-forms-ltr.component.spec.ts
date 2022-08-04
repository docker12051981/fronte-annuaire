import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormsLtrComponent } from './smart-forms-ltr.component';

describe('SmartFormsLtrComponent', () => {
  let component: SmartFormsLtrComponent;
  let fixture: ComponentFixture<SmartFormsLtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartFormsLtrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFormsLtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
