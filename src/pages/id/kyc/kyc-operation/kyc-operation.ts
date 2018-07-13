import { Component,OnInit} from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdKycPersonComponent} from "../../../../pages/id/kyc/person/person";
import {IdKycCompanyComponent} from "../../../../pages/id/kyc/company/company";
import {KycOrderPage} from "../../../../pages/id/kyc/kyc-order/kyc-order";
@Component({
  selector: 'page-kyc-operation',
  templateUrl: 'kyc-operation.html',
})
export class KycOperationPage  extends BaseComponent implements OnInit{
    private params;
    private aprType;
    ngOnInit(){
      this.params  = this.getNavParams().data;
      this.aprType = this.params["type"];
      this.setTitleByAssets('text-id-kyc-operation');
    }

    onNext(type) {
      if (type === 1) {
          this.add();
      } else {
          this.check();
      }
    }

    add(){
      if(this.aprType === 1){
         this.Go(IdKycPersonComponent,{id:this.aprType});
      }else{
        this.Go(IdKycCompanyComponent,{id:this.aprType});
      }
    }

    check(){
       this.Go(KycOrderPage,this.params);
    }
}
