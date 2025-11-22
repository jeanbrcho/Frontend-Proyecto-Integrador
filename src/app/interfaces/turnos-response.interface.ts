// turnos-response.interface.ts
import { Turno } from './turnos.interface';

export interface TurnosResponse {
  status: string;
  message: string;
  data: Turno[];
  count: number;
}
