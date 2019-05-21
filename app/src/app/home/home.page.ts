import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Http } from '@angular/http';
import { Router } from  "@angular/router";
import { NativeStorage} from '@ionic-native/native-storage/ngx';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {
  Direction,
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('itemState', [
      transition('void=> *', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-out')
      ]),
      transition('* => void', [
        animate('500ms ease-in', style({transform:'translateX(100%)'}))
      ])
    ])
  ]
})
export class HomePage {

  @ViewChild('myStack') swingStack: SwingStackComponent;
  @ViewChildren('myCard') swingCards: QueryList<SwingCardComponent>;

  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';


  constructor(private http: Http, private  authService:  AuthService, private  router:  Router, private nativeStroge: NativeStorage)
  {
    
      this.stackConfig = {
      // Default setting only allows UP, LEFT and RIGHT so you can override this as below
      allowedDirections: [ Direction.LEFT, Direction.RIGHT],
      // Now need to send offsetX and offsetY with element instead of just offset
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 1.7), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    }

    this.cards = [];

    // if(!this.authService.isLoggedIn())
    // {
    //   this.router.navigateByUrl('login-option');
    //   console.log('You are not authenticated.');
    // }
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    
    this.addNewCards(5);
  }

  // Connected through HTML
voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    this.addNewCards(1);
    if (like) {
      this.recentCard = 'You liked: ' + removedCard.email;
    } else {
      this.recentCard = 'You disliked: ' + removedCard.email;
    }
}

clickUp(like: boolean) {
  let removedCard = this.cards.pop();
  this.addNewCards(1);
  if (like) {
    this.recentCard = 'You liked: ' + removedCard.email;
  } else {
    this.recentCard = 'You disliked: ' + removedCard.email;
  }
}
 
// Add new cards to our array
async addNewCards(count: number) {
  this.http.get('https://randomuser.me/api/?results=' + count).pipe(
  map(this.extractData))
  .subscribe(result => {
    for (let val of result) {
      this.cards.push(val);
    }
  })
  console.log(this.cards);
}

private extractData(res:Response | any) {
  let body = res.json().results;
  console.log(body);
  return body || { };
}

  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);
    
    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }
    
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    
    return hex;
  }

  logout(){
    this.authService.logout().then(()=>{
      this.router.navigateByUrl('login-option');
    });
  }
}
