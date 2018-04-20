import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';


@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.less']
})
export class ReceiveComponent  extends BaseComponent implements OnInit  {


  code = 'EehM1A6MnVZxs6qH8AEA1pSLeW4RxmqhuU';

  ngOnInit() {
    this.setTitleByAssets('text-receive');
  }


}
