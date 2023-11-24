import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaReservaComponent } from './consulta-reserva.component';

describe('ConsultaReservaComponent', () => {
  let component: ConsultaReservaComponent;
  let fixture: ComponentFixture<ConsultaReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaReservaComponent]
    });
    fixture = TestBed.createComponent(ConsultaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
