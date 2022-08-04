import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormsComponent } from './smart-forms.component';

describe('SmartFormsComponent', () => {
  let component: SmartFormsComponent;
  let fixture: ComponentFixture<SmartFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
