import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
teamURL:string="http://localhost:3000/teams";
  constructor(private httpClient:HttpClient) { }
  getAllteams() {
    return this.httpClient.get<{teamsArray:any}>(this.teamURL);
  }
  // Response : One Object
  getTeamById(id: any) {
    return this.httpClient.get<{team:any}>(`${this.teamURL}/${id}`);
  }
  // Response : Message/Boolean
  deleteTeam(id: any) {
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.teamURL}/${id}`);
  }
  // Response : Message/Boolean
  addTeam(teamObj) {
    return this.httpClient.post<{message:string}>(this.teamURL, teamObj);
  }
  // Response : Message/Boolean
  editTeam(newTeam) {
    return this.httpClient.put<{isUpdated:boolean}>(this.teamURL, newTeam);
  }
}
