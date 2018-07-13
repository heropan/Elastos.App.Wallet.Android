import { Component,OnInit} from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";

@Component({
  selector: 'page-kyc-operation',
  templateUrl: 'kyc-operation.html',
})
export class KycOperationPage  extends BaseComponent implements OnInit{

    ngOnInit(){
      this.setTitleByAssets('text-id-kyc-operation');
    }

    onNext(type) {
      if (type === 1) {

      } else {

      }
    }
}
