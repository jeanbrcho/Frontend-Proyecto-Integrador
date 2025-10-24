import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service'; 

@Component({
  selector: 'app-mi-cuenta',
  standalone: true, 
  imports: [], 
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent {

  constructor(private authService: AuthService) {}

  onLogoutClick(): void {
   
    this.authService.logout();
    
  
  }
}