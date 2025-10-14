export interface Card {
  nombre: string;
  tipo: 'veterinaria' | 'peluqueria';
  servicios: string;
  horarios: string;
  direccion: string;
  imagen: string;
}