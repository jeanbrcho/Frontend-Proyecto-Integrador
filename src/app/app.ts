import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Perrito } from "./components/perrito/perrito";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Perrito],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
} 