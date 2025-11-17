import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../service/turnos.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  profesional: any = null;
  servicioSeleccionado: any = null;
  profesionalSeleccionado: any;


  fecha: string = '';
  hora: string = '';
  petname: string = '';
  phone: string = '';

  horasDisponibles: string[] = [];

  constructor(
    private turnoService: TurnosService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.servicioSeleccionado = navigation?.extras?.state?.['servicio'] || history.state?.servicio || null;
    this.profesional = navigation?.extras?.state?.['profesional'] || history.state?.profesional || null;

    if (!this.servicioSeleccionado || !this.profesional) {
      alert("⚠ No se seleccionó un servicio. Volvé a la página de servicios.");
      this.router.navigate(['/servicios']);
      return;
    }

    for (let h = 9; h <= 19; h++) {
      this.horasDisponibles.push(`${h.toString().padStart(2, '0')}:00`);
    }
  }

  guardarTurno() {
    const idUser = this.authService.getUserId();

    if (!idUser) {
      alert("⚠ Necesitas iniciar sesión para sacar un turno.");
      this.router.navigate(['/login']);
      return;
    }

    if (!this.servicioSeleccionado) {
      alert("⚠ No se seleccionó un servicio. Por favor volvé a la página de servicios.");
      this.router.navigate(['/servicios']);
      return;
    }

    const turno: any = {
      idUser: idUser,
      idProfessional: this.profesional.id, // ✅ clave principal ahora
      date: this.fecha,
      time: this.hora,
      petname: this.petname,
      phone: this.phone
    };

    // Si existe servicio, lo agregamos opcional
    if (this.servicioSeleccionado) {
      turno.idService = this.servicioSeleccionado.id;
    }

    this.turnoService.crearTurno(turno).subscribe({
      next: () => {
        alert('✅ Turno creado correctamente!');
        this.router.navigate(['/mi-cuenta']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Hubo un error al crear el turno.');
      }
    });
  }

}
