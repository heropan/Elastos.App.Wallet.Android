import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {CompanypathinfoPage} from '../../../pages/id/companypathinfo/companypathinfo';
import {BankcardpathinfoPage} from '../../../pages/id/bankcardpathinfo/bankcardpathinfo';
import {PhonepathinfoPage} from '../../../pages/id/phonepathinfo/phonepathinfo';
import {IdentitypathinfoPage} from '../../../pages/id/identitypathinfo/identitypathinfo';
@Component({
  selector: 'page-pathlist',
  templateUrl: 'pathlist.html',
})
export class PathlistPage extends BaseComponent implements OnInit{
           private  parmar ={};
           public pathList = [
                               {"name":"text-identity","path":"identityCard"},
                               {"name":"text-certified-phone","path":"phone"},
                               {"name":"text-certified-card","path":"bankCard"},
                               {"name":"text-certified-company","path":"enterprise"}];
           ngOnInit(){
              this.parmar = this.getNavParams().data;
              this.setTitleByAssets("text-path-list");
           }
           onNext(item){
                this.parmar["path"] = item["path"];
                console.log("---path---"+JSON.stringify(this.parmar));
                this.nextPage();
           }

           nextPage(){
            this.localStorage.get("kycId").then((val)=>{
              let  idsObj = JSON.parse(val);
              let  id = this.parmar["id"];
              let  path = this.parmar["path"];
              let idObj = idsObj[id];
              if(this.isNull(idObj[path])){
                   idObj[path] = {};
                   this.localStorage.set("kycId",idsObj).then(()=>{
                   this.jumpPage(path);
                 });
              }else{
                   this.jumpPage(path);
              }
       });
           }

       jumpPage(path){
           switch(path){
              case "enterprise":
                  this.Go(CompanypathinfoPage,this.parmar);
               break;
              case "identityCard":
                   this.Go(IdentitypathinfoPage,this.parmar);
                    break;
              case "phone":
                   this.Go(PhonepathinfoPage,this.parmar);
                    break;
              case "bankCard":
                  this.Go(BankcardpathinfoPage,this.parmar);
               break;
           }
       }

}
