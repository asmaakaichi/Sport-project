import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // Backend Server Address
  matchURL: string = "http://localhost:3000/matches";
  // httpClient : un livreur
  constructor(private httpClient: HttpClient) { }

  // Response :  Array of objects
  getAllMatches() {
    return this.httpClient.get <{matchesArray:any, message:string}>(this.matchURL);
  }
  // Response : One Object
  getMatchById(id: any) {
    return this.httpClient.get <{match:any}>(`${this.matchURL}/${id}`);
  }
  // Response : Message/Boolean
  deleteMatch(id: any) {
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.matchURL}/${id}`);
  }
  // Response : Message/Boolean
  addMatch(matchObj) {
    return this.httpClient.post<{message:string}>(this.matchURL, matchObj);
  }
  // Response : Message/Boolean
  editMatch(newMatch) {
    return this.httpClient.put<{isUpdated:boolean}>(this.matchURL, newMatch);
  }
  Search(Obj){
    return this.httpClient.post<{searchArray:any}>("http://localhost:3000/matches/search", Obj);
  }
  addComment(obj){
    return this.httpClient.post<{message:string}>("http://localhost:3000/matches/comment", obj);
  }
  getComments(){
    return this.httpClient.get<{matches:any}>(`${this.matchURL}/comments/getAll`);
  }

}
