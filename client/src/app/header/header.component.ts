import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  title = 'AyoVote App';
  desc = 'Suarakan pilihanmu!';
  pencarian: any;
  @Output() search = new EventEmitter<string>();
  apdet(value) {
    this.search.emit(value);
  }
  constructor() {}

  ngOnInit() {}
}
