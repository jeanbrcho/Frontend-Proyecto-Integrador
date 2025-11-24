import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesionalesService } from '../../service/profesional.service';
import { Profesional } from '../../interfaces/profesional.interface';

@Component({
  selector: 'app-profesionales',
  imports: [CommonModule],
  templateUrl: './profesionales.component.html',
  styleUrl: './profesionales.component.css'
})
export class ProfesionalesComponent implements OnInit {

  profesionales: Profesional[] = [];

  constructor(private profesionalesService: ProfesionalesService) { }

    ngOnInit() {
    this.profesionalesService.obtenerProfesionales().subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        this.profesionales = res.data;
      },
      error: (err) => console.error('Error al cargar profesionales:', err)
    });
  }

}
