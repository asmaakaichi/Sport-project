import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL:string="http://localhost:3000/users";
  constructor(private httpClient:HttpClient) { }
  getAllusers() {
    return this.httpClient.get(this.userURL);
  }
  getUserById(id){
    return this.httpClient.get<{user:any}>(`${this.userURL}/${id}`);
  }
 
  // Response : Message/Boolean
  deleteUser(id: any) {
    return this.httpClient.delete(`${this.userURL}/${id}`);
  }
  // Response : Message/Boolean
  addUser(user, file:File) {
    let formData= new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
   
    formData.append("img", file);
    if (user.tel) {
      formData.append("tel", user.tel);
    }
    return this.httpClient.post<{message:boolean}>(this.userURL+"/signup", formData);
  }
  login (user){
    return this.httpClient.post<{message:String, user:any}>(this.userURL+"/login", user)
  }

  // Response : Message/BooleanN
  editProfile(newProfile) {
    return this.httpClient.put(this.userURL, newProfile);
  }
}
