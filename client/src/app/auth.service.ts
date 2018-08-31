import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Injectable()
export class AuthenticationService {
  constructor(private router: Router, private http: HttpClient) {}
  resultMsg = {
    body: [],
    display: null,
    resultType: null
  };
  login = false;
  loginUser(e) {
    e.preventDefault();
    console.log(e);
    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    this.http
      .post('http://localhost:3000/', {
        username,
        password
      })
      .subscribe(
        res => {
          this.resultMsg.body.length = 0;
          // tslint:disable-next-line:forin
          for (const i in res) {
            if (res[i]['result'] === 'success') {
              this.resultMsg.display = true;
              this.resultMsg.body.push(res[i]['message']);
              localStorage.setItem('user', username);
              localStorage.setItem('userid', res[i]['userid']);
              this.login = true;
              this.router.navigate(['/dashboard']);
              window.scrollTo(0, 0);
            } else {
              this.resultMsg.resultType = false;
              if (res[i]['result'] === 'error') {
                this.resultMsg.body.push(res[i]['message']);
              } else {
                this.resultMsg.body.push(res[i]['message']);
                window.scrollTo(0, 0);
              }
            }
            console.log(res);
          }
          console.log(this.resultMsg.body);
        },
        err => {
          console.log(err);
        }
      );
    return true;
  }
  logout() {
    // remove user from local storage to log user out
    this.login = false;
    localStorage.removeItem('user');
    localStorage.removeItem('userid');
  }
  check(id) {
    return this.http
      .post('http://localhost:3000/check', {
        pemilih: id
      }).map(
        (res: Response) => res
      );
  }
}
