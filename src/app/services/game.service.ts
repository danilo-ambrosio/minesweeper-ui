import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CellOperation } from '../model/cell/CellOperation';
import { Preferences } from '../model/Preferences';
import { GameStatusTransition } from '../model/GameStatusTransition';

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
    return this.http.patch<any>(`${this.endpoint}/${gameId}/cell`, cellOperation);
  }

  changeStatus(gameId: string, statusTransition: GameStatusTransition) {
    return this.http.patch<any>(`${this.endpoint}/${gameId}/status`, statusTransition);
  }
}
