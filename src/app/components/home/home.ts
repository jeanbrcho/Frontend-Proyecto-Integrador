import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../carrusel/carrusel.component';
<<<<<<< HEAD
import { RouterLink } from '@angular/router';
=======
>>>>>>> 6782e2284de72b696aef246bb98d6535f392a606

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarruselComponent,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}

