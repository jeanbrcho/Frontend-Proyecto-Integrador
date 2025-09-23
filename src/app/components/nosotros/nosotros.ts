import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nosotros',
  imports: [ CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {
  equipo1 = [
    { nombre: 'Claudia', img: '/perrito2Nos.png'},
    { nombre: 'Jean', img: '/perrito2Nos.png'},
    { nombre: 'Sole', img: '/perrito2Nos.png'}
  ];

  equipo2 = [
    { nombre: 'Sergio', img: '/perrito.png'},
    { nombre: 'Edgar', img: '/perrito.png'},
    { nombre: 'Juanjo', img: '/perrito.png'}
  ];
}
