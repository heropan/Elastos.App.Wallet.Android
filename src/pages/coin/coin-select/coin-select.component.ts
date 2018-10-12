import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import { PopupComponent } from "ngx-weui";
import {RechargeComponent} from "../recharge/recharge.component";
import {Config} from "../../../providers/Config";
import {Util} from "../../../providers/Util";

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-select.component.html'
})
export class CoinSelectComponent extends BaseComponent implements OnInit {

  @ViewChild('subscribe') subPopup: PopupComponent;

  coinList = [];

  ngOnInit() {
    this.setTitleByAssets('text-coin-list');
    let mastId = Config.getCurMasterWalletId();
    let subwallet = Config.getSubWallet(mastId);
    if(subwallet){
      if(Util.isEmptyObject(subwallet)){
        this.coinList = [];
        return;
      }
      for (let coin in subwallet) {
        if (coin != 'ELA') {
          this.coinList.push({name: coin});
        }
      }
    }else{
      this.coinList = [];
    }
  }

  onItem(item) {
    this.Go(RechargeComponent, {chianId: item.name});
  }

}
