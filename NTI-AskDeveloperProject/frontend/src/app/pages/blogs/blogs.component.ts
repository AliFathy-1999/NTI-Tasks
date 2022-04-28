import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  Blogs:any=[];
  constructor(private activated: ActivatedRoute,public _globel: GlobalService) { }

  ngOnInit(): void {
  }
  handleBlogs(){
    this.activated.data.subscribe(data => {
      this._globel.getAllBlogs(data, 1).subscribe(res => {
        this.Blogs = res.data;
      })
    });
  }
}

