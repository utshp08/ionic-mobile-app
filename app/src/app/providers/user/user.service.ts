import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './userModel';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  AUTH_SERVER_ADDRESS = environment.server_address;
  
  dataSource = new BehaviorSubject<any[]>(<any[]>[]);
  currentUser = this.dataSource.asObservable();

  public SERVER_ADDRESS = environment.server_address;
  constructor
  (
    private httpClient      : HttpClient
  ){

   }
  
   headerOpt = new Headers({
    "Content-Type":"application/json"
   });



RetrieveUser (user) : Observable<any> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/user/${user.provider.id}`, user).pipe(
      tap(async (res:any) => {
        if(res.status)
        {
          this.dataSource.next(res);
        }
      })
    );
}

CreateUser(user) : Observable<any>{
return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/user/new-user`, user).pipe(
  tap(async (res:any) => {
    if(res)  this.dataSource.next(res);
  })
);
}

   
  setData(data:any)
  {
    this.dataSource.next(data);
  }


}
