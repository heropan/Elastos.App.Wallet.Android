import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import { PopupComponent } from "ngx-weui";
import {Util} from "../../../providers/Util";

@Component({
  selector: 'app-did-login',
  templateUrl: './did-login.component.html'
})
export class DidLoginComponent extends BaseComponent implements OnInit {

  @ViewChild('subscribe') subPopup: PopupComponent;

  ngOnInit(){
    this.setTitleByAssets('text-payment-confirm');
    this.setHeadDisPlay({left:false});
    // this.subPopup.config = {cancel:'',confirm:'',backdrop:false,is_full:false};
  }

}
