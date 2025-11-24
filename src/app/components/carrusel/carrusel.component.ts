import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesionalesService } from '../../service/profesional.service';
import { Profesional } from '../../interfaces/profesional.interface';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent implements OnInit {

  profesionales: Profesional[] = [];
  currentIndex = 0;
  autoSlideInterval: any;

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

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 2000); // 🔁 cada 4 segundos cambia al siguiente grupo
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.profesionales.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.profesionales.length) % this.profesionales.length;
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval); // 🔹 Limpia al salir del componente
    }
  }
  pauseAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resumeAutoSlide() {
    if (!this.autoSlideInterval) {
      this.startAutoSlide();
    }
  }
}