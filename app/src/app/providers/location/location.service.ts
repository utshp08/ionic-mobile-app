import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  SERVER_ADDRESS = environment.server_address;

  dataSource = new BehaviorSubject<any[]>(<any[]>[]);
  currentData = this.dataSource.asObservable();
  userID;

  constructor(
    private http        :HttpClient,
    private userService :UserService
  ) 
  {

  }

  setData(data:any)
  {
    this.dataSource.next(data);
  }

  sendCurrentPosition(data): Observable<any>{
    return this.http.post(`${this.SERVER_ADDRESS}/location/new`, data).pipe(
      tap(async (res) => {
        if(res) 
        {
          await this.dataSource.next(res);
        }
      })
    );
  }
}
