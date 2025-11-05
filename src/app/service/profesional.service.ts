import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesional } from '../interfaces/profesional.interface';

export interface ProfesionalesResponse {
  status: number;
  message: string;
  data: Profesional[];
}

@Injectable({ providedIn: 'root' })
export class ProfesionalesService {
  private apiUrl = 'http://localhost:3000/professionals';

  constructor(private http: HttpClient) { }

  // obtenerProfesionales(): Observable<ProfesionalesResponse> {
  //   return this.http.get<ProfesionalesResponse>(this.apiUrl);
  // }

  // Para obtener todos los profesionales
  obtenerProfesionales(): Observable<ProfesionalesResponse> {
    return this.http.get<ProfesionalesResponse>(this.apiUrl);
  }

  // Para obtener profesionales por servicios (o servicios asociados)
  obtenerProfesionalesConServicios(): Observable<ProfesionalesResponse> {
   const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ProfesionalesResponse>(`${this.apiUrl}/services`, { headers });
  }
}
