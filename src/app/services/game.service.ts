import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CellOperation } from '../model/cell/CellOperation';
import { Game } from '../model/Game';
import { Preferences } from '../model/Preferences';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.serverUrl}/games`;
  }

  configure(preferences: Preferences) : Observable<any> {
    return this.http.post<any>(this.endpoint, preferences);
  }

  performCellOperation(gameId: string, cellOperation: CellOperation) {
    return this.http.post<any>(`${this.endpoint}/${gameId}`, cellOperation);
  }
}
