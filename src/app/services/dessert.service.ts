import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dessert } from '../models/desserts.model';

@Injectable({
  providedIn: 'root'
})
export class DessertService {
  private dataUrl = 'data.json';

  constructor(private http: HttpClient) {}

  getDesserts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(this.dataUrl);
  }
}
