import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import { PopupComponent } from "ngx-weui";

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html'
})
export class CoinListComponent extends BaseComponent implements OnInit {

  @ViewChild('subscribe') subPopup: PopupComponent;

  coinList = [];
  coinListCache = {};
  payPassword: string;
  singleAddress: boolean = false;
  currentCoin: string;

  onSelect(item) {
    item.open = ! item.open;
    if (item.open) {
      let coin = {};
      coin["id"] = item.name;
      this.currentCoin = item.name;
      this.subPopup.show().subscribe((res: boolean) => {
      });      
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
      // this.walletManager.getSupportedChains((allChains) => {
        let allChains = ['ELA', 'ss'];
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
      // });
    });
  }

  onClick() {
    this.createSubWallet(this.currentCoin);
    this.localStorage.add('coinListCache', this.currentCoin);
  }

  createSubWallet(chainId){
    // Sub Wallet
    alert(this.payPassword)
    this.walletManager.createSubWallet(chainId, this.payPassword, this.singleAddress, 0, (val)=>{

    });
  }

}
