import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userData:any={}
  constructor(private _global:GlobalService) {
    this._global.getme().subscribe(res=>{
      this.userData = res
      console.log(this.userData)
      //console.log(`${_global.imgUrl}${this.userData.pImage}`)
    })
   }

  ngOnInit(): void {
  }


}
