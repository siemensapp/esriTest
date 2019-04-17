import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesEliminadasComponent } from './asignaciones-eliminadas.component';

describe('AsignacionesEliminadasComponent', () => {
  let component: AsignacionesEliminadasComponent;
  let fixture: ComponentFixture<AsignacionesEliminadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionesEliminadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionesEliminadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
