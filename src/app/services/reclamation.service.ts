import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  reclamationURL: string = "http://localhost:3000/reclamations";
  constructor(private httpClient:HttpClient) { }
 send(obj){
  return this.httpClient.post<{isAdded:boolean}>(this.reclamationURL, obj)
 }
 getAllUserReclamations(id){
  return this.httpClient.get<{reclamations:any}>(`${this.reclamationURL}/${id}`)
 }
 replyReclamation(obj){
  return this.httpClient.post<{isAdded:boolean}>(`${this.reclamationURL}/reply`,obj)
 }
 getAllUserReplyToReclamation(id1,id2){
  return this.httpClient.get<{reply:any}>(`${this.reclamationURL}/getReply/${id1}/${id2}`)
 }
}
