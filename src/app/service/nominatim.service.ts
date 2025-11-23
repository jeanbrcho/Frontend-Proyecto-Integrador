import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  private apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  geocode(address: string) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'User-Agent': 'MiAppAngular/1.0'
    });

    const url = `${this.apiUrl}?q=${encodeURIComponent(address)}&format=json&limit=1`;

    return this.http.get<any>(url, { headers }).pipe(
      map(results => {
        if (results.length > 0) {
          return {
            lat: results[0].lat,
            lng: results[0].lon,
          };
        } else {
          throw new Error('No se encontró la dirección');
        }
      })
    );
  }
}
