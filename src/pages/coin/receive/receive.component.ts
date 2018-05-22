import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import {QrcodeModel} from './../../../models/qrcode.model';
import {HeaderComponent, Header} from './../../../app/header/app.header';
import {Logger} from "../../../providers/Logger";
import {AddressComponent} from "../../wallet/address/address.component";
import {ValidatorsUtil} from "../../../providers/ValidatorsUtil";


@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  // styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent extends BaseComponent implements OnInit {


  code: QrcodeModel;

  ngOnInit() {
    this.setTitleByAssets('text-receive');

    this.setHeadDisPlay({left:true,title:true,right:true});

    this.code = new QrcodeModel();
    this.code.qrcode = '测试文字';
    // 'EehM1A6MnVZxs6qH8AEA1pSLeW4RxmqhuU'

    this.setRightIcon('./assets/images/icon/icon-s.svg', () => {
      Logger.info('分享');
    });


  }

  onChange(){
    if(!ValidatorsUtil.number(this.code.amount)){
      this.toast('correct-amount');
    }
  }


  onNext(type){
    switch (type){
      case 0:
        this.native.copyClipboard(this.code.qrcode);
        this.toast('copy-ok');
        break;
      case 1:
        this.createAddress();
        break;
      case 2:
        this.Go(AddressComponent);
        break;
    }
  }

  createAddress(){
    this.walletManager.createAddress((data)=>{
        this.code.qrcode = data.address;
    });
  }

}
