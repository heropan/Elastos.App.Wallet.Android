import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import { PTRComponent } from 'ngx-weui';
//import {Config} from "../../../providers/Config";
import {RecordinfoComponent} from "../recordinfo/recordinfo.component";

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  // styleUrls: ['./record.component.scss']
})
export class RecordComponent extends BaseComponent implements OnInit {

  transferList = [
    {},
    {},
    {}
  ];


  onRefresh(ptr: PTRComponent) {
      this.updateData(0);
      ptr.setFinished(this.getLanguageInstance()['update-ok']);
  }

  updateData(type){
    if(type == 0){ //刷新
      this.transferList.push({});
    }else{        //加载更多
      this.transferList.push({});
    }

    // this.walletManager.getAllTransaction(this.transferList.length - 1,Config.COIN_LIST,0,(list)=>{
    //
    // });
  }


  ngOnInit() {
    this.setTitleByAssets('coin-recent-transfer');
  }

  onItem() {
    this.Go(RecordinfoComponent,{id:0,txId:0});
  }

}
