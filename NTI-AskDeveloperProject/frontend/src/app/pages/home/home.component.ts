import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  AllQuestions:any = {}
  AllUsers:any = {}
  AllAnswers:any = {}
  isAnswer:boolean=false
  token = localStorage.getItem('token')
  isSubmitted = true;
  userInfo:any=localStorage.getItem('userInfo')
  userid=JSON.parse(this.userInfo)
  id=this.userid.data._id

  UserAnswer:any = new FormGroup({
    answers:new FormControl('' , [Validators.required , Validators.minLength(10),Validators.maxLength(500)])
  })
  constructor(public _global: GlobalService,private activated: ActivatedRoute,private router:Router,private toastr:ToastrService) {
    this._global.navbar = true ;
    if(this.token){
      this._global.isLoggedIn = true;
    }else{
      this._global.isLoggedIn = false;
    }
  }
  ngOnInit(): void {
    this._global.getAllUsersQuestions().subscribe(res=>{
      this.AllQuestions = res.data
      console.log(res)
    })
    this._global.getAllUsers().subscribe(res=>{
      this.AllUsers = res.data
      console.log(res)
    })
  }
  handlsSubmit(){
    if(this.token){
      this.isSubmitted = true;
    }
    else{
      this.isSubmitted = false;
      this.toastr.warning('Please Login First')
      this.router.navigateByUrl('/login')
    }
  }
  handleAnswer(){
    this.isAnswer = true;
  }
  handleAnswerSubmit(){
    this._global.addAnswer(this.id,this.UserAnswer.value).subscribe(res=>{
      if(res.error){
        this.toastr.error("Error Answer Question")
      }
      else{
        this.toastr.success("Answer Successfully")
        this.router.navigate(['home'])
      }
    },(err)=>{
      this.toastr.error(err.error.message)
    })
  }
}
