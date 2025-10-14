import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../models/card.model';
import { CardsService } from '../services/cards.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-servicios',
  standalone: true,                
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios implements OnInit{
  cards: Card[] = [];
  filtroTipo: string = '';

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    console.log('Servicios ngOnInit'); // esto debe verse
    this.cardsService.getCards().subscribe({
      next: cards => {
        console.log('Cards cargadas:', cards); // esto también debe verse
        this.cards = cards;
      },
      error: err => console.error(err)
    });
  }


  cardsFiltradas(): Card[] {
  if (!this.filtroTipo) {
    return this.cards; // devuelve array
  }
  return this.cards.filter((card: Card) => card.tipo === this.filtroTipo); // devuelve array filtrado
}
}