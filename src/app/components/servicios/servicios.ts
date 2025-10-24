import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../models/card.model';
import { CardsService } from '../services/cards.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios implements OnInit {
  cards: Card[] = [];
  filtroTipo: string = '';
  mostrarFavoritos = false;

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    this.cardsService.getCards().subscribe({
      next: cards => {
        this.cards = cards;
        this.cargarFavoritos();
        console.log('Cards cargadas:', this.cards);
      },
      error: err => console.error(err)
    });
  }

  cargarFavoritos() {
    const favoritos: string[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.cards.forEach(card => {
      card.favorito = favoritos.includes(card.nombre);
    });
  }

  cardsFiltradas(): Card[] {
    let resultado = this.filtroTipo ? this.cards.filter(c => c.tipo === this.filtroTipo) : this.cards;
    if (this.mostrarFavoritos) {
      resultado = resultado.filter(c => c.favorito);
    }
    return resultado;
  }

  toggleFavorito(card: Card) {
    card.favorito = !card.favorito;
    this.guardarFavoritos();
  }

  guardarFavoritos() {
    // Guardamos solo los nombres de las cards favoritas
    const favoritos = this.cards.filter(c => c.favorito).map(c => c.nombre);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }
}