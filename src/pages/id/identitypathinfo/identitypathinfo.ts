import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
@Component({
  selector: 'page-identitypathinfo',
  templateUrl: 'identitypathinfo.html',
})
export class IdentitypathinfoPage extends BaseComponent implements OnInit{
  public identitypathlist =[{"fullName":"宋家准","identityNumber":"410426198811151012"},{"fullName":"宋家准q","identityNumber":"410426198811151012"}];
  private parmar ={};
  ngOnInit(){
   this.parmar = this.getNavParams().data;
   console.log("---path---"+JSON.stringify(this.parmar));
   this.setTitleByAssets("text-company-path-deatils");
  }

  onNext(item){

  }

}
