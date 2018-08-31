import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private router: Router, private http: Http, private route: ActivatedRoute) {
    this.getData();
   }
  data: any = [];
  getData() {
    this.route.params.subscribe(params => {
    return this.http.get('http://localhost:3000/api/' + params['id'])
    .map((res: Response) => res.json())
    .subscribe(
      data => {
        console.log(data);
        this.data = data;
      }
    );
  });
}



  ngOnInit() {
  }

}
