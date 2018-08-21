import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IdKycCompanyComponent} from "../../../pages/id/kyc/company/company";
@Component({
  selector: 'page-companypathinfo',
  templateUrl: 'companypathinfo.html',
})
export class CompanypathinfoPage extends BaseComponent implements OnInit{
       public companyPathList = [];
       private parmar ={};
       public idsObj ={};
       ngOnInit(){
        this.parmar = this.getNavParams().data;
        console.log("---path---"+JSON.stringify(this.parmar));
        this.setTitleByAssets("text-company-path-deatils");
        this.localStorage.get("kycId").then((val)=>{
          if(val == null || val === undefined || val === {} || val === ''){
            return;
           }
          this.idsObj = JSON.parse(val);

          let pathList = this.idsObj[this.parmar["id"]][this.parmar["path"]];

          for(let key in pathList){
             this.companyPathList.push(pathList[key]);
          }


        });
       }

      onNext(item){
          alert("---item----"+JSON.stringify(item));
          this.jumpPage(item);
      }

      onCommit(){
          this.Go(IdKycCompanyComponent,this.parmar);
      }

      jumpPage(item){
          switch(item["pathStatus"]){
                case 0 :
                    break;
                case 2 :
                    break;
          }
      }
}
