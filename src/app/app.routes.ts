import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Servicios } from './components/servicios/servicios';
import { RouterLink } from '@angular/router';

export const routes: Routes = [
   { path: '', 
    component: Home },
    {path:'servicios',component:Servicios}
];

