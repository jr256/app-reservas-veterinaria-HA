import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecojoReservaComponent } from './recojo-reserva.component';

describe('RecojoReservaComponent', () => {
  let component: RecojoReservaComponent;
  let fixture: ComponentFixture<RecojoReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecojoReservaComponent]
    });
    fixture = TestBed.createComponent(RecojoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
