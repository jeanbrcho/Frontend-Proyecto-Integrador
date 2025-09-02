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

  imagenes: string[] = [                    // Declarás una propiedad del componente: un array de rutas de imágenes.
  'peluqueria1.jpg',               // Cada elemento es la URL de una imagen en tu proyecto.
  'peluqueria2.jpg',
  'peluqueria3.webp'
];


}
