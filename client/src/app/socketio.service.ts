import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketioService {

socket = io('http://localhost:3000/');
  // Constructor with an injection of ToastService
  constructor() {

  }

  // Emit: gist saved event
  emitEventOnGistSaved(gistSaved) {
      this.socket.emit('Saved', gistSaved);
  }

  // Emit: gist updated event
  emitEventOnGistUpdated(gistUpdated) {
    this.socket.emit('Updated', gistUpdated);
  }

  // Consume: on gist saved
  consumeEvenOnGistSaved(par) {
    this.socket.on('Saved', function(datasaved) {
      par.getData();
    });
  }

  // Consume on gist updated
  consumeEvenOnGistUpdated(par) {
    this.socket.on('Updated', function(dataupdate) {
      console.log('update client');
     par.getDatabyIdSocket('http://localhost:3000/vote/', dataupdate._id);
    });
  }

}
