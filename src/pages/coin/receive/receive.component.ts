import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {QrcodeModel} from '../../../models/qrcode.model';
import {HeaderComponent, Header} from '../../../app/header/app.header';


@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.less']
})
export class ReceiveComponent extends BaseComponent implements OnInit {


  code: QrcodeModel;

  ngOnInit() {
    this.setTitleByAssets('text-receive');
    this.code = new QrcodeModel();
    this.code.qrcode = '测试文字';
    // 'EehM1A6MnVZxs6qH8AEA1pSLeW4RxmqhuU'

    this.setRightIcon('./assets/images/icon/icon-s.svg', () => {
      this.log.info('分享');
    });



  }


}
