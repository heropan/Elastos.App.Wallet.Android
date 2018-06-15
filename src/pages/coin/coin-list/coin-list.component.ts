import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  // styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent extends BaseComponent implements OnInit {

  coinList = [];

  onSelect(item) {
    item.open = ! item.open;
  }

  ngOnInit() {
    this.setTitleByAssets('text-coin-list');
    this.walletManager.getSupportedChains((allChains) => {
      // {"ELA": "ELA", "ID": "ID"}
      for (var i = 0; i < allChains.length; i++) {
        let isOpen = false;
        this.walletManager.getAllChainIds((openChains)=>{
          isOpen = allChains[i] in openChains ? true : false;
        });
        this.coinList.push({name: allChains[i], open: isOpen});
      }
      // this.coinList = [{name: 'ELA', open: true}, {name: 'BTC', open: false}];
    });
  }

}
