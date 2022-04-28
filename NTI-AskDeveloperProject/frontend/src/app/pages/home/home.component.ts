import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token = localStorage.getItem('token')
  constructor(public _global: GlobalService,private activated: ActivatedRoute) {
    this._global.navbar = true ;if(this.token) {this._global.isLoggedIn = true;}else{this._global.isLoggedIn = false;}
  }
  ngOnInit(): void {

  }
}
