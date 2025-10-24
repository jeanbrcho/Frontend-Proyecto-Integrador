import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router'; // 🔑 1. IMPORTAR ROUTER
import { IProfile } from '../interfaces/ProfileInterface';


export interface LoginRequest {
  email: string;
  password: string;
}



export interface AuthResponse {
  status: string,
  message: string
  data: {
    user: any,
    token: string
  }
}

interface IResponseProfile {
  status: string,
  message: string
  data?: IProfile
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private loginUrl = `${this.baseUrl}/auth/login`;


  constructor(private http: HttpClient, private router: Router) { }


  login(credenciales: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, credenciales).pipe(
      tap(response => {
        this.saveToken(response?.data?.token ?? '');
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('auth_token', token);

  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }


  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  userProfile(): Observable<IResponseProfile> {
    const urlProfile = `${this.baseUrl}/auth/profile`;
    console.log(localStorage.getItem('auth_token'))
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`, //el token se envía en el header
    };
    return this.http.get<IResponseProfile>(urlProfile, { headers });
  }

}