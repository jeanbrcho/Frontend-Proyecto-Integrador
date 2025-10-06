import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios {
    cards = [
    {
      nombre: 'Veterinaria Patitas Felices',
      servicios: 'Consultas, Vacunación, Emergencias',
      horarios: 'Lunes a Sábado: 9:00 - 20:00',
      direccion: 'Av. Siempre Viva 123',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'Clínica Animalia',
      servicios: 'Baños, Cirugías, Rayos X',
      horarios: 'Lunes a Viernes: 8:30 - 18:30',
      direccion: 'Calle Belgrano 456',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'Centro Mascotas',
      servicios: 'Peluquería, Vacunas, Adopciones',
      horarios: 'Lunes a Domingo: 10:00 - 19:00',
      direccion: 'San Martín 789',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'Veterinaria Los Andes',
      servicios: 'Emergencias 24hs, Laboratorio',
      horarios: 'Todos los días: 24hs',
      direccion: 'Mitre 234',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'Animal World',
      servicios: 'Consultas, Vacunación, Cirugías menores',
      horarios: 'Lunes a Sábado: 9:00 - 21:00',
      direccion: 'Av. Libertad 888',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'PetCare',
      servicios: 'Guardería, Radiología, Vacunación',
      horarios: 'Lunes a Domingo: 10:00 - 19:00',
      direccion: 'Calle Rivadavia 555',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'Care',
      servicios: 'Guardería, Radiología, Vacunación',
      horarios: 'Lunes a Domingo: 10:00 - 19:00',
      direccion: 'Calle Rivadavia 555',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'PetCat',
      servicios: 'Guardería, Radiología, Vacunación',
      horarios: 'Lunes a Domingo: 10:00 - 19:00',
      direccion: 'Calle Rivadavia 555',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'Pepito',
      servicios: 'Guardería, Radiología, Vacunación',
      horarios: 'Lunes a Domingo: 10:00 - 19:00',
      direccion: 'Calle Rivadavia 555',
      imagen: 'peluqueria2.jpg'
    }
  ];

}
