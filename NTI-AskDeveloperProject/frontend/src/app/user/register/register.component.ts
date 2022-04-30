import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  UserData:any = new FormGroup({
    fname:new FormControl('' , [Validators.required , Validators.minLength(3),Validators.maxLength(10)]),
    lname:new FormControl('' , [Validators.required , Validators.minLength(3),Validators.maxLength(10)]),
    age:new FormControl('' , [Validators.required , Validators.min(12),Validators.max(80)]),
    username:new FormControl('' , [Validators.required , Validators.minLength(3),Validators.maxLength(15)]),
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]),
    phone:new FormControl('' , [Validators.required , Validators.minLength(11)]),
    titlejob:new FormControl('' , [Validators.required , Validators.minLength(3),Validators.maxLength(20)])
  })
  isSubmitted = false;
  get RegisterData(){
    return this.UserData.controls;
  }
  get fname(){
    return this.UserData.get('fname')
  }
  constructor(private _global: GlobalService,private toastr:ToastrService , private router : Router) {
    this._global.navbar = false
   }

  ngOnInit(): void {

  }
  handleSubmit(){
    this.isSubmitted =true
    if(this.UserData.valid){
      this._global.getUser(this.UserData.value).subscribe(res=>{
        console.log(res)
        if(res.error){
          this.toastr.error("Error in Registering User")
        }
        else{
          this.toastr.success("Register Successfully")
          this.router.navigate(['login'])
          //this.router.navigateByUrl("/login")
        }
      },(err)=>{
        this.toastr.error(err.error.message)
      })
  }
}
}
