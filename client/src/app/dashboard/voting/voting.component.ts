import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import {AuthenticationService} from '../../auth.service';
import {CRUDService} from '../crud.service';
import { SocketioService } from '../../socketio.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  canvas: any;
  ctx: any;
  tangga = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [],
        borderWidth: 2
      }
    ]
  };
  userData = {
    _id: '',
    name: '',
    options: [
      {
        avatar: '',
        optionName: '',
        votes: null
      }
    ],
    pemilih: '',
    pilihan: []
  };
  iniform = { optionName: '' };
  vote = false;
  dynamicColors() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return 'hsl(' + r + ',' + g + ',' + b + ')';
    }
  getDatabyId(id: any): any {
    return this.crud.getDatabyId('http://localhost:3000/vote/', id)
      .subscribe(data => {
        this.userData = data;
        this.userData['pilihan'] = [];
        console.log(this.userData);
        for (let i = 0; i < this.userData.options.length; i++) {
          if (this.userData.options.length > 0) {
            this.tangga.labels.push(this.userData.options[i].optionName);
            this.tangga.datasets[0].data.push(this.userData.options[i].votes);
            this.tangga.datasets[0].backgroundColor.push(this.dynamicColors());
          }
        }
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        const myChart = new Chart(this.ctx, {
          type: 'pie',
          data: this.tangga,
          options: {
            responsive: false
          }
        });
      });
  }
  updateData(id: any, val: any): any {
    this.iniform.optionName = val;
    for (let i = 0; i < this.userData.options.length; i++) {
      if (this.userData.options[i].optionName === this.iniform.optionName) {
        this.userData.options[i].votes = this.userData.options[i].votes + 1;
        this.userData.pemilih = localStorage.getItem('userid');
        this.userData.pilihan.push(this.iniform.optionName);
        this.userData.options[i].avatar = this.userData.options[i].avatar;
      }
    }
    console.log(this.userData);
      this.crud.updateData('http://localhost:3000/voteupdate/', id , this.userData)
        .subscribe(
          res => {
            this._SocketioService.emitEventOnGistUpdated(this.userData);
            console.log(res);
            return window.location.reload();
          },
          err => {
            console.log(err);
          }
        );
  }
  logout() {
    this.auth.login = false;
    this.auth.logout();
  }
  constructor(
    private router: Router,
    private http: Http,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    public crud: CRUDService,
    private _SocketioService: SocketioService) {
    this.route.params.subscribe(params => {
      this.getDatabyId(params['id']);
    });
    if (this.vote === false && localStorage.getItem('userid') === null) {
      alert('silahkan login');
      this.router.navigate(['/dashboard']);
    } else {
    this.auth.check(localStorage.getItem('userid'))
    .subscribe(
      res => {
      if (res['pilihan'].length === 0) {
        this.vote = true;
      } else {
        for (let i = 0; i < res['pilihan'].length; i++) {
        this.userData.pilihan.push(res['pilihan'][i]);
      }
      console.log(this.userData);
      }
      for (let i = 0; i < this.userData.options.length; i++) {
        for (let j = 0; j < res['pilihan'].length; j++) {
          if (this.userData.options[i].optionName.includes(res['pilihan'][j])) {
            console.log('Anda sudah memilih');
           return this.vote = false;
          } else {
            this.vote = true;
          }
        }
      }
      console.log(this.vote);
      },
      err => {
        console.log(err);
      }
    );
  }
  }
  ngOnInit() {

  }

}
