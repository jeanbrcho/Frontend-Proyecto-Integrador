import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesionalesService } from '../../service/profesional.service';
import { Profesional } from '../../interfaces/profesional.interface';
import { RouterLink } from '@angular/router';

interface ProfesionalFrontend extends Profesional {
  favorito: boolean;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios implements OnInit {
  profesionales: ProfesionalFrontend[] = [];
  mostrarFavoritos = false;
  filtroTipo: string = '';
  todasEspecialidades: string[] = [];

  constructor(private profesionalesService: ProfesionalesService) { }

  ngOnInit(): void {
    this.profesionalesService.obtenerProfesionales().subscribe({
      next: (res) => {
        console.log('Respuesta backend:', res);
        // Añadimos la propiedad 'favorito' a cada profesional
        this.profesionales = res.data.map(p => ({ ...p, favorito: false }));
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

}