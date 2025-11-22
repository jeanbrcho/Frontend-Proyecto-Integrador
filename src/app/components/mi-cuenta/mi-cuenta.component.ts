import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { IProfile } from '../../interfaces/ProfileInterface';
import { TurnosService } from '../../service/turnos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent {
  turnos: any[] = [];
  userProfile?: IProfile; // aquí guardamos la info del usuario
  loading: boolean = false
  loadingProfile: boolean = false;
  loadingTurnos: boolean = false;

  constructor(private authService: AuthService, private turnosService: TurnosService) { }

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
          this.loading = false;
          this.loadTurnos();
        }, 400);
      }
    });
  }

  loadTurnos(): void {
    const userId = this.userProfile?.id; // si ya tenemos ID
    if (!userId) return;

    this.loadingTurnos = true;
    this.turnosService.obtenerTurnosPorUsuario(userId).subscribe({
      next: (res) => {
        this.turnos = res.data || [];
        console.log('Turnos cargados:', this.turnos);
      },
      error: (err) => {
        console.error('Error al cargar turnos', err);
        this.loadingTurnos = false;
      },
      complete: () => {
        setTimeout(() => this.loadingTurnos = false, 300);
      }
    });
  }

  editProfile():void{
    console.log("metodo editar proximamente")
  }

}