import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUsuario } from './login-usuario';

describe('LoginUsuario', () => {
  let component: LoginUsuario;
  let fixture: ComponentFixture<LoginUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
