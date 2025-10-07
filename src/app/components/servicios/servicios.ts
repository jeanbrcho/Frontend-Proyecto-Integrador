import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../../models/card.model';
import { CardsService } from '../../services/cards.service';
import { Producto } from '../../models/producto.model';
import { listaProductos } from '../../mocks/productos.mock';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios implements OnInit {
  cards: Card[] = [];
  productos: Producto[] = [];
  filtroTipo: string = '';

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe(cards => this.cards = cards);
    this.productos = listaProductos;
  }

  cardsFiltradas(): Card[] {
    if (!this.filtroTipo) {
      return this.cards;
    }
    return this.cards.filter((card: Card) => card.tipo === this.filtroTipo);
  }
}
