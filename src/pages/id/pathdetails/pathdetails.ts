import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IdKycPersonComponent} from "../../../pages/id/kyc/person/person";
import {IdKycCompanyComponent} from "../../../pages/id/kyc/company/company";
@Component({
  selector: 'page-pathdetails',
  templateUrl: 'pathdetails.html',
})
export class PathdetailsPage extends BaseComponent implements OnInit{
     private  parmar ={};
     personValidate={"word":"北京比特大陆科技有限公司","legalPerson":"詹克团",
     "registrationNum":"911101080804655794","fullName":"宋家准","identityNumber":"410426198811151012","mobile":"18210230496","cardMobile":"18310230498","cardNumber":"6225260167820399"};
     ngOnInit(){
      this.parmar = this.getNavParams().data;
      console.log("---path---"+JSON.stringify(this.parmar));
      this.setTitleByAssets("text-path-deatils");
     }
     onCommit(){
        let path = this.parmar["path"];
        switch(path){
          case "bankCard":
          case "phone":
          case "identityCard":
             this.Go(IdKycPersonComponent,this.parmar);
          break;
          case "enterprise":
             this.Go(IdKycCompanyComponent,this.parmar);
              break;
        }
     }

}
