import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html'
})
export class CoinListComponent extends BaseComponent implements OnInit {

  coinList = [];
  coinListCache = {};

  onSelect(item) {
    item.open = ! item.open;
    if (item.open) {
      let coin = {};
      coin["id"] = item.name;
      this.localStorage.add('coinListCache', coin);
    } else {
      this.localStorage.get('coinListCache').then((val)=>{
        let coinListCache = JSON.parse(val);
        delete(coinListCache[item.name]);
        this.localStorage.set('coinListCache', coinListCache);
      });
    }
  }

  ngOnInit() {
    this.setTitleByAssets('text-coin-list');
    this.setLeftIcon("",()=>{
      this.events.publish("home:update");
      this.Back();
    });
    this.localStorage.get('coinListCache').then((val)=>{
      this.walletManager.getSupportedChains((allChains) => {
        for (var chain in allChains) {
          let isOpen = false;
          let coinListCache = JSON.parse(val);
          if (coinListCache) {
            isOpen = chain in coinListCache ? true : false;
          }
          if (chain == "ELA") {
            isOpen = true;
          }
          this.coinList.push({name: chain, open: isOpen});
        }
      });
    });
  }
}
