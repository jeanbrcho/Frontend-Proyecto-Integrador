import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros implements AfterViewInit {
  equipo1 = [
    { nombre: 'Claudia', img: '/perrito2Nos.png' },
    { nombre: 'Jean', img: '/perrito2Nos.png' },
    { nombre: 'Sole', img: '/perrito2Nos.png' }
  ];

  equipo2 = [
    { nombre: 'Sergio', img: '/perrito.png' },
    { nombre: 'Edgar', img: '/perrito.png' },
    { nombre: 'Juanjo', img: '/perrito.png' }
  ];

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          // Scroll suave a la sección
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
