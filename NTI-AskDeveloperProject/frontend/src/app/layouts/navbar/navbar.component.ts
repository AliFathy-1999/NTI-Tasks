import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data: any
  constructor(public _global:GlobalService,public router:Router,public toastr:ToastrService) {

  }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    this._global.getme().subscribe(res=>{
      this.data = res
    })
    if(token){
      // this._global.AuthLogin().subscribe(res=>{
      //   this._global.isLoggedIn = true
      //   this.data=res
      //   console.log(res)
      //   localStorage.setItem('userInfo',JSON.stringify(res))
      // })
      this._global.AuthLogin();

    // console.log(JSON.parse(localStorage.getItem('userInfo')))
    // this.data = JSON.parse()

    }

  }

  logoutSubmit(){
    this._global.UserLogout().subscribe(res=>{
      console.log(res)
      if(res.error){
        this.toastr.error(res.error)
      }
      else{
        this.toastr.success("Logout Successfully")
        localStorage.removeItem('token')
        this._global.isLoggedIn=false;
        this.router.navigate(['/home'])
      }
    } , (err)=>{
      this.toastr.error("Error in Logout")
    })

  }

}
