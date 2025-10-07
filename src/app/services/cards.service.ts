// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Card } from '../models/card.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CardsService {

//   constructor(private http: HttpClient) {}

//   getCards(): Observable<Card[]> {
//     return this.http.get<Card[]>('/api/cards'); // MSW intercepta esto
//   }
// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private cards: Card[] = [
    {
      nombre: 'Veterinaria AnimalCare',
      tipo: 'veterinaria',
      servicios: 'Consultas, vacunas, cirugías',
      horarios: 'Lun a Vie 9-18',
      direccion: 'Calle Falsa 123',
      imagen: 'peluqueria1.jpg'
    },
    {
      nombre: 'Peluquería Happy Pets',
      tipo: 'peluqueria',
      servicios: 'Baños, cortes, estética',
      horarios: 'Lun a Sab 10-19',
      direccion: 'Av. Siempreviva 456',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'Veterinaria PetCare',
      tipo: 'veterinaria',
      servicios: 'Urgencias, vacunas, peluquería',
      horarios: 'Lun a Vie 8-20',
      direccion: 'Av. Las Flores 789',
      imagen: 'peluqueria1.jpg'
    },
    {
      nombre: 'Peluquería Peluditos',
      tipo: 'peluqueria',
      servicios: 'Cortes, baños, estética avanzada',
      horarios: 'Mar a Sab 10-18',
      direccion: 'Calle 123 456',
      imagen: 'peluqueria2.jpg'
    },
    {
      nombre: 'Veterinaria Salud Animal',
      tipo: 'veterinaria',
      servicios: 'Consultas generales y cirugías',
      horarios: 'Lun a Vie 9-17',
      direccion: 'Calle Primavera 321',
      imagen: 'peluqueria1.jpg'
    },
    {
      nombre: 'Peluquería Canina Bella',
      tipo: 'peluqueria',
      servicios: 'Baños, cortes y accesorios',
      horarios: 'Lun a Sab 10-19',
      direccion: 'Av. Sol 654',
      imagen: 'peluqueria2.jpg'
    }
  ];

  constructor() { }

  getCards(): Observable<Card[]> {
    return of(this.cards);
  }
}
