import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../models/card.model';
import { CardsService } from '../../services/cards.service';


@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios implements OnInit {
  cards: Card[] = [];
  filtroTipo: string = '';

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe(cards => this.cards = cards);
  }

  cardsFiltradas(): Card[] {
    if (!this.filtroTipo) {
      return this.cards;
    }
    return this.cards.filter((card: Card) => card.tipo === this.filtroTipo);
  }
}
