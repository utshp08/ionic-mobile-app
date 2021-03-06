import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { HomePage } from './home.page';
import { HttpModule } from '@angular/http';
import {SwingModule} from 'angular2-swing';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    SwingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {
  d: string;
  constructor(private http: Http) {

  }
  check() {
    let data = {
      d : this.d
    }

    this.http.get('http://localhost:8080/check' + data).pipe(
      map(res => res.json()))
      .subscribe(response => {
        console.log('GET response', response);
      });
    
  }
}
