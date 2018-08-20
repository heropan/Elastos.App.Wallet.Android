import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
@Component({
  selector: 'page-companypathinfo',
  templateUrl: 'companypathinfo.html',
})
export class CompanypathinfoPage extends BaseComponent implements OnInit{
       public companyPathList = [{"word":"北京比特大陆科技有限公司","legalPerson":"詹克团",
       "registrationNum":"911101080804655794"},{"word":"北京比特大陆科技有限公司1","legalPerson":"詹克团1",
       "registrationNum":"9112010808046557941"}];
       private parmar ={};
       ngOnInit(){
        this.parmar = this.getNavParams().data;
        console.log("---path---"+JSON.stringify(this.parmar));
        this.setTitleByAssets("text-company-path-deatils");
       }

      onNext(item){
          alert("---item----"+JSON.stringify(item));
      }
}
