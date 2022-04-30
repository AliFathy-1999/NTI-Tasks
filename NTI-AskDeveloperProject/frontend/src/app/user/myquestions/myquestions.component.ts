import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-myquestions',
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.css']
})
export class MyquestionsComponent implements OnInit {
  userQuestions:any = []
  constructor(private _global: GlobalService,private toastr:ToastrService,public router: Router) {

   }

  ngOnInit(): void {
    this._global.getmyAllQuestions().subscribe(res=>{
      this.userQuestions= res.data
      console.log(res.data)
    })
  }

}
