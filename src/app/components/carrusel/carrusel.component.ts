import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {

  imagenes: string[] = [                   
  'peluqueria1.jpg',               
  'peluqueria2.jpg',
  'peluqueria3.webp'
];
}
