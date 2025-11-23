import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfesionalesService } from '../../service/profesional.service';
import { SafePipe } from '../../Pipe/safe.pipe';
import { NominatimService } from '../../service/nominatim.service';

@Component({
  selector: 'app-detalle-profesional',
  imports: [CommonModule, SafePipe],
  templateUrl: './detalle-profesional.component.html',
  styleUrls: ['./detalle-profesional.component.css']
})
export class DetalleProfesionalComponent implements OnInit, OnChanges {

  @Input() profesional: any;
  profesionalData: any;
  loading = true;
  googleMapsUrl: string = '';
  tieneDireccion: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private ProfesionalesService: ProfesionalesService, private nominatim: NominatimService) { }

  // 👉 Función que arma el iframe de Google Maps
  obtenerCoordenadas() {
    if (!this.profesionalData) return;

    // ---- Construcción dinámica de la dirección ----
    const partes = [
      `${this.profesionalData.street} ${this.profesionalData.streetNumber}`,
      this.profesionalData.postalCode,
      this.profesionalData.neighborhood,
      this.profesionalData.province,
      'Argentina'
    ].filter(x => x && x.trim() !== '');

    const address = partes.join(', ');

    console.log("🗺 Buscando dirección:", address);

    // ---- Geocodificación ----
    this.nominatim.geocode(address).subscribe({
      next: geo => {
        this.tieneDireccion = true;

        this.googleMapsUrl =
          `https://www.google.com/maps?q=${geo.lat},${geo.lng}&z=15&output=embed`;
      },
      error: () => {
        this.tieneDireccion = false;
        console.warn("❌ No se encontró la dirección");
      }
    });
  }


  // --- Se ejecuta cuando llega un @Input() desde el padre ---
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profesional']?.currentValue) {
      this.profesionalData = this.profesional;
      this.loading = false;
      this.obtenerCoordenadas();
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
      this.obtenerCoordenadas();
      return;
    }

    // 2) Caso: viene por resolver (ruta /profesional/:id)
    this.route.data.subscribe(data => {
      if (data['profesional']) {
        this.profesional = data['profesional'];
        this.profesionalData = this.profesional;
        this.loading = false;
        this.obtenerCoordenadas();
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