import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  // obtenerProfesionales(): Observable<Profesional[]> {
  //   return this.http.get<Profesional[]>(this.apiUrl);
  // }
  obtenerProfesionales(): Observable<ProfesionalesResponse> {
    return this.http.get<ProfesionalesResponse>(this.apiUrl);
  }
}
