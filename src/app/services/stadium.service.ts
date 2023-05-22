import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  stadiumURL:string="http://localhost:3000/stadiums";
  constructor(private httpClient:HttpClient) { }
  getAllstadiums() {
    return this.httpClient.get<{stadiumsArray:any}>(this. stadiumURL);
  }
  // Response : One Object
  getStadiumById(id: any) {
    return this.httpClient.get<{stadium:any}>(`${this.stadiumURL}/${id}`);
  }
  // Response : Message/Boolean
  deleteStadium(id: any) {
    return this.httpClient.delete<{isDeleted:boolean}>(`${this. stadiumURL}/${id}`);
  }
  // Response : Message/Boolean
  addStadium(stadiumObj) {
    return this.httpClient.post<{message:string}>(this.stadiumURL, stadiumObj);
  }
  // Response : Message/Boolean
  editStadium(newStadium) {
    return this.httpClient.put<{isUpdated:boolean}>(this.stadiumURL, newStadium);
  }
}
