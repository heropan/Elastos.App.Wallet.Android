import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  // styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent extends BaseComponent implements OnInit {

  coinList = [
    {name: 'ELA', open: true},
    {name: 'BTC', open: false}
  ];

  onSelect(item) {
    item.open = ! item.open;
  }


  ngOnInit() {
    this.setTitleByAssets('text-coin-list');
  }

}
