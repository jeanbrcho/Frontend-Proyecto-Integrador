import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { IProfile } from '../../interfaces/ProfileInterface';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [],
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent {

  userProfile?: IProfile; // aquí guardamos la info del usuario
  loading: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  onLogoutClick(): void {
    setTimeout(()=>{
      this.authService.logout();
    },450)
  }


  loadUserProfile(): void {
    this.loading = true
    this.authService.userProfile().subscribe({
      next: (response) => {
        this.userProfile = response.data; // guardamos el profile
        console.log('Profile cargado:', this.userProfile);
      },
      error: (err) => {
        console.error('Error al cargar profile', err);
        this.loading = false
      },
      //el complete solamente pasa si la respuesta es exitosa
      complete: () => {
        console.log('Petición de profile completada');
        setTimeout(() => {
          this.loading = false
        }, 400);
      }
    });
  }

  editProfile():void{
    console.log("metodo editar proximamente")
  }

}