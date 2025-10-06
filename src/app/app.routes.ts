import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Nosotros } from './components/nosotros/nosotros';
import { Servicios } from './components/servicios/servicios';

export const routes: Routes = [
   { path: '', component: Home },
   { path:'nosotros', component: Nosotros},
   { path: 'servicios', component: Servicios}
];

