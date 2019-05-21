import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { map, catchError } from 'rxjs/operators';

const countryJson = '../../../assets/countryLists.json';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  SERVER_ADDRESS = environment.server_address;
  private apiUrl = '';

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
  

  
  getCountries(): Observable<string[]> {
    return this.http.get(countryJson).pipe(
      map(this.extractData),
      catchError(this.handleError)
    ); 
  }

  private extractData(res:Response | any) {
    let body = res;
    console.log(body);
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
