import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserInput {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  password: string;
  rol?: 'admin' | 'user' | 'professional';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  registerUser(userData: UserInput): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
