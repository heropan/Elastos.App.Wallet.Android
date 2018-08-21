import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IdKycPersonComponent} from "../../../pages/id/kyc/person/person";
import {IdentityauthPage} from '../../../pages/id/identityauth/identityauth';
@Component({
  selector: 'page-identitypathinfo',
  templateUrl: 'identitypathinfo.html',
})
export class IdentitypathinfoPage extends BaseComponent implements OnInit{
  public identitypathlist =[];
  private parmar ={};
  public idsObj ={};
  ngOnInit(){
   this.parmar = this.getNavParams().data;
   console.log("---path---"+JSON.stringify(this.parmar));
   this.setTitleByAssets("text-identity-path-deatils");

   this.localStorage.get("kycId").then((val)=>{
    if(val == null || val === undefined || val === {} || val === ''){
      return;
     }
    this.idsObj = JSON.parse(val);

    let pathList = this.idsObj[this.parmar["id"]][this.parmar["path"]];

    for(let key in pathList){
       this.identitypathlist.push(pathList[key]);
    }


  });
  }

  onNext(item){

  }

  onCommit(){
    this.Go(IdentityauthPage,this.parmar);
  }

}
