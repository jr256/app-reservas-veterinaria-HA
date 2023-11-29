import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDisponiblesComponent } from './consulta-disponibles.component';

describe('ConsultaDisponiblesComponent', () => {
  let component: ConsultaDisponiblesComponent;
  let fixture: ComponentFixture<ConsultaDisponiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaDisponiblesComponent]
    });
    fixture = TestBed.createComponent(ConsultaDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
