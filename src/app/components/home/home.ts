import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../carrusel/carrusel.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarruselComponent,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}

