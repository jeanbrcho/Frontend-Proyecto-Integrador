import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros implements AfterViewInit {

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          // Scroll suave a la sección
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
