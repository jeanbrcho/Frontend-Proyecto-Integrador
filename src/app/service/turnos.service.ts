import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../interfaces/turnos.interface';
import { TurnosResponse } from '../interfaces/turnos-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private apiUrl = 'https://btdyww2b6k.execute-api.us-east-1.amazonaws.com/shifts';
  // private apiUrl = 'http://localhost:3000/shifts';

  constructor(private http: HttpClient) {}

  // Crear turno con token en headers
  crearTurno(turno: Turno): Observable<Turno> {
    const token = localStorage.getItem('auth_token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Turno>(this.apiUrl, turno, { headers });
  }

  // Obtener turnos de un usuario específico
  obtenerTurnosPorUsuario(idUser: string): Observable<TurnosResponse> {
    const token = localStorage.getItem('auth_token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<TurnosResponse>(`${this.apiUrl}/user/${idUser}`, { headers });
  }
}