import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registro-usuario.html',
  styleUrls: ['./registro-usuario.css']
})
export class RegistroUsuario implements OnInit {
  registerForm!: FormGroup;
  letrasRegex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g;
  numerosRegex = /[^0-9]/g;
  cargando = false;
  mensaje = '';
  showAlert = false; //alarta de registro exitoso

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      rol: ['user']
    }, {
      validators: this.passwordMatchValidator
    });
  }

  cleanInput(controlName: string, regex: RegExp) {
    const control = this.registerForm.get(controlName);
    if (control && control.value != null) {
      const cleanedValue = (control.value as string).replace(regex, '');
      if (control.value !== cleanedValue) {
        // no emitir evento para evitar loops
        control.setValue(cleanedValue, { emitEvent: false });
      }
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) return null;
    if (password.pristine || confirmPassword.pristine) { return null; }
    return password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
  }

  // getters para template
  get nombre() { return this.registerForm.get('nombre'); }
  get apellido() { return this.registerForm.get('apellido'); }
  get dni() { return this.registerForm.get('dni'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onSubmit() {
    this.mensaje = '';
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Construir payload que espera tu backend (en inglés)
    const payload = {
      name: this.nombre?.value.trim(),
      lastname: this.apellido?.value.trim(),
      dni: this.dni?.value.trim(),
      email: this.email?.value.trim().toLowerCase(),
      password: this.password?.value,
      rol: this.registerForm.get('rol')?.value || 'user'
    };

    this.cargando = true;

    this.userService.registerUser(payload).subscribe({
      next: (res) => {
      // backend devuelve: { status, message, data }
      this.mensaje = res?.message || 'Registro exitoso';
      this.registerForm.reset({ rol: 'user' });
      this.cargando = false;

      // Mostrar alerta flotante
      this.showAlert = true;
    },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        if (err?.error?.message) {
          this.mensaje = `Error: ${err.error.message}`;
        } else {
          this.mensaje = 'Error al registrar usuario. Revisa la consola del servidor.';
        }
        this.cargando = false;
      }
    });
  }

  closeAlert() {
    this.showAlert = false;
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }


}