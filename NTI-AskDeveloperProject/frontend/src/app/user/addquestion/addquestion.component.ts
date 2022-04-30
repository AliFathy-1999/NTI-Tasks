import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  userQuestions:any = new FormGroup({
    questionTitle:new FormControl('' , [Validators.required , Validators.minLength(3),Validators.maxLength(30)]),
    questionbody:new FormControl('' , [Validators.required , Validators.minLength(10),Validators.maxLength(100)]),
    tags:new FormControl('' , [Validators.required , Validators.minLength(3),Validators.maxLength(20)])
  })
  constructor(private _global:GlobalService,private router:Router,private toastr: ToastrService) {

   }
   isSubmitted = false;
   get addquestions(){
     return this.userQuestions.controls;
   }
  ngOnInit(): void {
  }
  handleSubmit(){
    this.isSubmitted = true;
    if(this.userQuestions.valid){
      this._global.addQuestion(this.userQuestions.value).subscribe(res=>{
        if(res.error){
          this.toastr.error(res.message)
        }else{

          this.toastr.success(res.message)
          this.router.navigateByUrl('/home')
        }
      })
    }
  }
}
