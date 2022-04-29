import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
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
  get EditData(){
    return this.UserData.controls;
  }
  userInfo:any=localStorage.getItem('userInfo')
  userid=JSON.parse(this.userInfo)
  id=this.userid.data._id
  constructor(private _global:GlobalService,private toastr:ToastrService,private Activated:ActivatedRoute,private router:Router) {

  }

  ngOnInit(): void {
    this._global.getme().subscribe(res=>{
      this.UserData.patchValue({
        fname:res.data.fname,
        lname:res.data.lname,
        age:res.data.age,
        username:res.data.username,
        email:res.data.email,
        phone:res.data.phone,
        titlejob:res.data.titlejob
      })
    })
  }


  handleSubmit(){
    this.isSubmitted = true
    if(this.UserData.valid){
      this._global.editUser(this.id,this.UserData.value).subscribe(res=>{
        console.log(res)
        if(res.error){
          this.toastr.error("Error Updated User")
        }
        else{
          this.toastr.success("Updated Successfully")
          this.router.navigate(['myprofile'])
          //this.router.navigateByUrl("/login")
      }
    })
    }

  }

  }


