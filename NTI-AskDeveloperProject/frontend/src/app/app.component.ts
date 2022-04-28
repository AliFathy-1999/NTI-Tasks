import { Component } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  token = localStorage.getItem('token')
  constructor(public _global:GlobalService){
    if(this.token) {
      this._global.isLoggedIn = true;
    }
    else{
      this._global.isLoggedIn = false;
    }
  }



}
