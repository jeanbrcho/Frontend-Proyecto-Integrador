import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Nosotros } from './components/nosotros/nosotros';


export const routes: Routes = [
   { path: '', component: Home },
   { path:'nosotros', component: Nosotros}
];

