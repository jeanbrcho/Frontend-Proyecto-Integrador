import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Perrito } from "./components/perrito/perrito";
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Perrito, ChatbotComponent, CommonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  
  // 1. Estado actual del modo oscuro
  isDarkMode: boolean = false; 

  ngOnInit(): void {
    // 2. Al iniciar, revisamos si el usuario ya tenía una preferencia guardada
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.aplicarTema(this.isDarkMode);
  }

  // 3. Función para cambiar el modo
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.aplicarTema(this.isDarkMode);
    
    // 4. Guardar la preferencia en el navegador
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  // 5. Función que añade o quita la clase CSS 'dark-theme' al <body>
  private aplicarTema(isDark: boolean): void {
    if (isDark) {
      // document.body es el elemento HTML más alto donde aplicamos la clase
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
} 