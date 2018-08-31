import { Component, ElementRef, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  urls = new Array<string>();
  anyfiles = new Array<string>();
  constructor(
    private http: Http,
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  onUpload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#ler');
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    for (let i = 0; i < this.anyfiles.length; i++) {
      formData.append('photo', this.anyfiles[i][0]);

    }
    this.uploadToServer(formData).subscribe(
      (res) => {
        console.log(res);
      }
    );

  }

  beforeupload(event) {
    this.urls = [];
    const files = event.target.files;
    this.anyfiles.push(files);
    console.log(this.anyfiles);
    for (let i = 0; i < this.anyfiles.length; i++) {
        const reader: any = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(this.anyfiles[i][0]);
    }
  }

  uploadToServer (bodyRequest): Observable<any> {
    return this.http.post('http://localhost:3000/fileupload', bodyRequest).map(
      (res: Response) => res
    );
  }

}
