import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './userModel';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public SERVER_ADDRESS = "http://192.168.0.15:3000";
  constructor
  (
    private http      : Http
  ){

   }
  
   headerOpt = new Headers({
    "Content-Type":"application/json"
   });

   saveNewUser(user) : Observable<User[]> {

      return this.http.post(`${this.SERVER_ADDRESS}/user/new-user`, user).pipe(
        tap(async (res: any) => {
          
        })
      )
   };


}
