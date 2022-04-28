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
  flag: boolean = false;
  constructor(public _global:GlobalService,public router:Router,public toastr:ToastrService) {
  }

  ngOnInit(): void {
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
