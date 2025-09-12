import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../components/carrusel/carrusel.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarruselComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}

