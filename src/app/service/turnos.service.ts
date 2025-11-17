import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../interfaces/turnos.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private apiUrl = 'https://btdyww2b6k.execute-api.us-east-1.amazonaws.com/shifts';

  constructor(private http: HttpClient) {}

  // Crear turno
  crearTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }
}