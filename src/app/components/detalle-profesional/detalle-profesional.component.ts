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
    // ✅ Solo si hay calle y número exactos
    if (this.profesionalData?.street && this.profesionalData?.streetNumber) {

      // Construimos la dirección completa (solo con datos existentes)
      const partes = [
        this.profesionalData.street,
        this.profesionalData.streetNumber,
        this.profesionalData.neighborhood,
        this.profesionalData.province,
        'Argentina'
      ].filter(x => x && x.trim() !== '').join(', ');

      // URL de Google Maps con la dirección exacta
      this.googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(partes)}&output=embed`;
      this.tieneDireccion = true;

    } else {
      // Si falta calle o número, no mostramos mapa
      this.tieneDireccion = false;
      this.googleMapsUrl = '';
    }
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