import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}

