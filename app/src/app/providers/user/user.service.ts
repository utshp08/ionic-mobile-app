import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './userModel';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public SERVER_ADDRESS = environment.server_address;
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
