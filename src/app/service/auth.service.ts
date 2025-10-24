import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router'; // 🔑 1. IMPORTAR ROUTER


export interface LoginRequest {
 email: string;
 password: string;
}


export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = 'http://localhost:3000'; 
 private loginUrl = `${this.baseUrl}/auth/login`; 

 
 constructor(private http: HttpClient, private router: Router) {}

 
 login(credenciales: LoginRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(this.loginUrl, credenciales).pipe(
   tap(response => {
    this.saveToken(response.token);
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
}