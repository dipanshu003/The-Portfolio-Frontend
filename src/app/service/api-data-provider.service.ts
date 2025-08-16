import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { InfoDataCommand } from '../models/info-data.model';

@Injectable({
  providedIn: 'root',
})
export class ApiDataProviderService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/api';

  // Define the type of data you expect, e.g., any[] or a specific interface
  getAllInfoDetails(): Observable<InfoDataCommand> {
    return this.http.get<InfoDataCommand>(`${this.baseUrl}/info`).pipe(
      catchError((err) => {
        console.error('HTTP error', err);
        throw err;
      })
    );
  }
}
