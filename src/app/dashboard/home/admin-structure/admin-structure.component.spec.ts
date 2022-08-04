import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStructureComponent } from './admin-structure.component';

describe('AdminStructureComponent', () => {
  let component: AdminStructureComponent;
  let fixture: ComponentFixture<AdminStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
