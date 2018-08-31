import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketioService } from '../socketio.service';
import 'rxjs/add/operator/map';
import * as Chart from 'chart.js';

@Injectable()
export class CRUDService {
// tslint:disable-next-line:no-shadowed-variable
constructor(private router: Router, private http: Http, private route: ActivatedRoute, private SocketioService: SocketioService) { }
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
  canvas: any;
  ctx: any;
  tangga = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [],
        borderWidth: 1
      }
    ]
  };
  data: any = [];
    dynamicColors() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }


//   saveData() {
//     const self = this;
//     this.route.params.subscribe(params => {
//     return this.http.post('http://localhost:3000/new', this.Data)
//     .map((res: Response) => res.json())
//     .subscribe(
//       res => {
//         self.SocketioService.emitEventOnGistSaved(this.Data);
//         console.log(res);
//       }, (err) => {
//         console.log(err);
//       }
//     );
//   });
// }

  getData() {
    return this.http.get('http://localhost:3000/vote').map((res: Response) => res.json())
    .subscribe(
      data => {
          this.userData = data;
          this.userData['pilihan'] = [];
          return console.log(this.userData);
        }
    );
  }

//   delete(id) {
//     const self = this;
//     return this.http.delete('http://localhost:3000/delete' + '/' + id)
//     .map((res: Response) => res.json())
//     .subscribe(
//       res => {
//         console.log('Deleted');
//         self.SocketioService.emitEventOnGistUpdated(this.userData);
//         this.getData('http://localhost:3000/api');
//       }, (err) => {
//         console.log(err);
//       }
//     );
// }

  updateData(url, id, data) {
      return this.http.put(url + id, data)
      .map(res => res.json());
  }

  getDatabyIdSocket(url, id) {
    return this.http.get(url + id)
    .map((res: Response) => res.json())
      .subscribe(data => {
        this.userData = data;
        this.userData['pilihan'] = [];
        console.log(this.userData);
        if (this.userData.options.length > 0) {
        for (let i = 0; i < this.userData.options.length; i++) {
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
  getDatabyId(url, id) {
    return this.http.get(url + id)
    .map((res: Response) => res.json());
}

}
