import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Nosotros } from './components/nosotros/nosotros';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';
import { LoginUsuario } from './components/login-usuario/login-usuario';
import { Servicios } from './components/servicios/servicios';
import { TurnoComponent } from './components/turno/turno.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';

export const routes: Routes = [
   { path: '', component: Home },
   { path:'nosotros', component: Nosotros},
   { path:'registro', component: RegistroUsuario},
   { path:'login', component: LoginUsuario},
   { path: 'servicios', component: Servicios},
   { path: 'turno', component: TurnoComponent },
   { path: 'mi-cuenta', component: MiCuentaComponent }
];

