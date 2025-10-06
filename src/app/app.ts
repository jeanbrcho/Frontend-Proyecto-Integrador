import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Perrito } from "./components/perrito/perrito";
import { Servicios } from './components/servicios/servicios';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Perrito, Servicios],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
} 