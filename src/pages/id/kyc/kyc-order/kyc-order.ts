import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdKycResultComponent} from "../../../../pages/id/kyc/result/result";
@Component({
  selector: 'page-kyc-order',
  templateUrl: 'kyc-order.html',
})
export class KycOrderPage  extends BaseComponent implements OnInit{
  serialNumList = ["1_2_3_4","2_3_3_4"];
  params:any;
  ngOnInit(){
     this.params = this.getNavParams().data;
     this.setTitleByAssets("text-id-kyc-order-list");
  }

  onNext(type) {
    if (type === 1) {
      this.Go(IdKycResultComponent,{});
    } else {
      this.Go(IdKycResultComponent,{});
    }
  }
}
