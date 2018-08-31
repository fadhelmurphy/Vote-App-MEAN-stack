import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import {AuthenticationService} from '../../auth.service';
import { SocketioService } from '../../socketio.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  urls = new Array<string>();
  anyfiles = new Array<string>();
fieldArray: any = [];
userData: any = {
  avatar: [],
  name: '',
  optionName: []
};
  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: Http, private el: ElementRef, public auth: AuthenticationService,private SocketioService: SocketioService) { }

  ngOnInit() {
  }

  saveData() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#ler');
    for (let i = this.fieldArray.length - 1; i >= 0; i--) {
        this.userData.optionName.unshift(this.fieldArray[i].optionName[0]);
    }
    console.log(this.fieldArray);
    for (let i = 0; i < this.anyfiles.length; i++) {
      this.userData.avatar.push(this.anyfiles[i][0]);
    }
    if (inputEl.files.length > 0) {
      this.userData.avatar.push(inputEl.files[0]);
    }
    const formData = new FormData();
    for (let i = 0; i < this.userData.avatar.length; i++) {
      formData.append('photo', this.userData.avatar[i]);

    }
    const blobOverrides = JSON.stringify(this.userData);

    formData.append('overrides', blobOverrides);
    this.route.params.subscribe(() => {
      return this.http.post('http://localhost:3000/vote', formData)
        .map((res: Response) => res.json())
        .subscribe(res => {
          this.SocketioService.emitEventOnGistSaved(this.userData);
          console.log(res);
          Object.getOwnPropertyNames(this.userData).length = 0;
          this.fieldArray.length = 0;
          return this.router.navigate(['/dashboard']);
        }, (err) => {
          console.log(err);
        });
    });
}

addFieldValue() {
  console.log(this.userData);
    this.fieldArray.push(this.userData);
    this.userData = {
    avatar: [],
    name: '',
    optionName: []};
}

deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    this.anyfiles.splice(index, 1);
}

onUpload() {
  const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#ler');


}

beforeupload(event) {
  this.urls = [];
  const files = event.target.files;
  this.anyfiles.push(files);
  for (let i = 0; i < this.anyfiles.length; i++) {
      const reader: any = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      };
      reader.readAsDataURL(this.anyfiles[i][0]);
  }
}

logout() {
  this.auth.login = false;
  this.auth.logout();
}
}
