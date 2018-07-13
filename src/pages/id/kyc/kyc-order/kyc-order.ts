import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
@Component({
  selector: 'page-kyc-order',
  templateUrl: 'kyc-order.html',
})
export class KycOrderPage  extends BaseComponent implements OnInit{

  ngOnInit(){
     this.setTitleByAssets("text-id-kyc-order-list");
  }

  onNext(type) {
    if (type === 1) {

    } else {

    }
  }
}
