import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfesionalesService } from '../../service/profesional.service';

@Component({
  selector: 'app-detalle-profesional',
  imports: [CommonModule],
  templateUrl: './detalle-profesional.component.html',
  styleUrls: ['./detalle-profesional.component.css']
})
export class DetalleProfesionalComponent implements OnInit, OnChanges {

  @Input() profesional: any;
  profesionalData: any;
  loading = true;

  constructor(private route: ActivatedRoute, private router: Router, private ProfesionalesService: ProfesionalesService) { }

  // --- Se ejecuta cuando llega un @Input() desde el padre ---
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profesional']?.currentValue) {
      this.profesionalData = this.profesional; 
      this.loading = false;
    }
  }

  // --- Inicialización del componente ---
  ngOnInit(): void {
    console.log("STATE RECIBIDO:", history.state);

    // 1) Caso: viene por navigation state (lo trae el botón desde la lista)
    if (history.state?.profesional) {
      this.profesional = history.state.profesional;
      this.profesionalData = this.profesional;
      this.loading = false;
      return;
    }

    // 2) Caso: viene por resolver (ruta /profesional/:id)
    this.route.data.subscribe(data => {
      if (data['profesional']) {
        this.profesional = data['profesional'];
        this.profesionalData = this.profesional;
        this.loading = false;
      }
    });
  }

  // Navegar al formulario con ID
  sacarTurno() {
    console.log("📤 Enviando profesional:", this.profesionalData);
    this.router.navigate(['/turnos'], {
      state: { profesional: this.profesionalData }
    });
  }
}