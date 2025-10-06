import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarruselComponent,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}

