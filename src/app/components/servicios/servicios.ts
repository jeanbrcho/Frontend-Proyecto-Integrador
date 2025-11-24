import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesionalesService } from '../../service/profesional.service';
import { Profesional } from '../../interfaces/profesional.interface';
import { AuthService } from '../../service/auth.service'; // asegúrate de que el path sea correcto
import { Router } from '@angular/router';

interface ProfesionalFrontend extends Profesional {
  favorito: boolean;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios implements OnInit {
  profesionales: ProfesionalFrontend[] = [];
  mostrarFavoritos = false;
  filtroTipo: string = '';
  todasEspecialidades: string[] = [];

  constructor(private profesionalesService: ProfesionalesService,
    private authService: AuthService,
    private router: Router) { }


  // ngOnInit(): void {
  //   this.profesionalesService.obtenerProfesionalesConServicios().subscribe({
  //     next: (res) => {
  //       console.log("Profesionales con servicios recibidos:", res.data);
  //       this.profesionales = res.data.map(p => ({ ...p, favorito: false }));
  //       const especialidades = this.profesionales.map(p => p.specialty);
  //       this.todasEspecialidades = Array.from(new Set(especialidades));
  //     },
  //     error: (err) => console.error('Error al cargar profesionales:', err)
  //   });
  // }
  ngOnInit(): void {
    this.profesionalesService.obtenerProfesionalesConServicios().subscribe({
      next: (res) => {
        console.log("Profesionales con servicios recibidos:", res.data);

        this.profesionales = res.data
          // 🔥 SOLO mostrar profesionales con servicios activos
          .filter((p: any) => p.active)  
          .map((p: any) => ({ ...p, favorito: false }));

        const especialidades = this.profesionales.map(p => p.specialty);
        this.todasEspecialidades = Array.from(new Set(especialidades));
      },
      error: (err) => console.error('Error al cargar profesionales:', err)
    });
  }


  profesionalesFiltrados(): ProfesionalFrontend[] {
    let lista = this.profesionales;

    // Filtrar por tipo si hay algo seleccionado
    if (this.filtroTipo) {
      lista = lista.filter(p => p.specialty.toLowerCase().includes(this.filtroTipo.toLowerCase()));
    }

    // Filtrar por favoritos si corresponde
    if (this.mostrarFavoritos) {
      lista = lista.filter(p => p.favorito);
    }

    return lista;
  }

  toggleFavorito(prof: ProfesionalFrontend): void {
    prof.favorito = !prof.favorito;
  }

  irATurnos(servicio: any, profesional: any) {
    console.log("Navegando a turnos con:", servicio, profesional);
    this.router.navigate(['/turnos'], { state: { servicio, profesional } });
  }

  verMas(prof: any) {
    this.router.navigate(['/detalle-profesional'], {
      state: { profesional: prof }
    });
  }


}