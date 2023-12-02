import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRecojosComponent } from './reporte-recojos.component';

describe('ReporteRecojosComponent', () => {
  let component: ReporteRecojosComponent;
  let fixture: ComponentFixture<ReporteRecojosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteRecojosComponent]
    });
    fixture = TestBed.createComponent(ReporteRecojosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
