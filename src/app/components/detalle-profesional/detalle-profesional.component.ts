import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SafeUrlPipe } from '../../service/safe-url.pipe';

@Component({
  selector: 'app-detalle-profesional',
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './detalle-profesional.component.html',
  styleUrls: ['./detalle-profesional.component.css']
})
export class DetalleProfesionalComponent implements OnInit, OnChanges {

  @Input() profesional: any;
  profesionalData: any;
  loading = true;

  googleMapsUrl: string = '';
  mostrarMapa: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  // --- Se ejecuta cuando llega un @Input() desde el padre ---
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profesional']?.currentValue) {
      this.profesionalData = this.profesional;
      this.loading = false;
      this.generarMapa();
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
      this.generarMapa();
      return;
    }

    // 2) Caso: viene por resolver (ruta /profesional/:id)
    this.route.data.subscribe(data => {
      if (data['profesional']) {
        this.profesional = data['profesional'];
        this.profesionalData = this.profesional;
        this.loading = false;
        this.generarMapa();
      }
    });
  }

  generarMapa() {
    const lat = this.profesionalData?.location?.latitude;
    const lng = this.profesionalData?.location?.longitude;

    if (lat && lng) {
      this.googleMapsUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      this.mostrarMapa = true;
    } else {
      this.mostrarMapa = false;
    }
  }

  // Navegar al formulario con ID
  sacarTurno() {
    console.log("📤 Enviando profesional:", this.profesionalData);
    this.router.navigate(['/turnos'], {
      state: { profesional: this.profesionalData }
    });
  }
}