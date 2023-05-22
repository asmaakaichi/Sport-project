import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerURL:string="http://localhost:3000/players";
  constructor(private httpClient:HttpClient) { }
  getAllplayers() {
    return this.httpClient.get<{playersArray:any}>(this.playerURL);
  }
  // Response : One Object
  getPlayerById(id: any) {
    return this.httpClient.get<{player:any}>(`${this.playerURL}/${id}`);
  }
  // Response : Message/Boolean
  deletePlayer(id: any) {
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.playerURL}/${id}`);
  }
  // Response : Message/Boolean
  addPlayer(playerObj) {
    return this.httpClient.post<{message:string}>(this.playerURL, playerObj);
  }
  // Response : Message/Boolean
  editPlayer(newPlayer) {
    return this.httpClient.put<{isUpdated:boolean}>(this.playerURL, newPlayer);
  }
}

