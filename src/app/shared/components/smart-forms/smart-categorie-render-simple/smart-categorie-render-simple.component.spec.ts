import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCategorieRenderSimpleComponent } from './smart-categorie-render-simple.component';

describe('SmartCategorieRenderSimpleComponent', () => {
  let component: SmartCategorieRenderSimpleComponent;
  let fixture: ComponentFixture<SmartCategorieRenderSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartCategorieRenderSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCategorieRenderSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
