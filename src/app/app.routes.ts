import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Nosotros } from './components/nosotros/nosotros';
import { RegistroUsuario } from './components/registro-usuario/registro-usuario';


export const routes: Routes = [
   { path: '', component: Home },
   { path:'nosotros', component: Nosotros},
   { path:'registro', component: RegistroUsuario}
];

