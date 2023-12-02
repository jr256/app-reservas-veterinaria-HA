import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteConsultasComponent } from './reporte-consultas.component';

describe('ReporteConsultasComponent', () => {
  let component: ReporteConsultasComponent;
  let fixture: ComponentFixture<ReporteConsultasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteConsultasComponent]
    });
    fixture = TestBed.createComponent(ReporteConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
