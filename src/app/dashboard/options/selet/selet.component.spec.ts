import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletComponent } from './selet.component';

describe('SeletComponent', () => {
  let component: SeletComponent;
  let fixture: ComponentFixture<SeletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
