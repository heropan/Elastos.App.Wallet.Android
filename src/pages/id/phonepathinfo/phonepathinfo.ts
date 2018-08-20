import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
@Component({
  selector: 'page-phonepathinfo',
  templateUrl: 'phonepathinfo.html',
})
export class PhonepathinfoPage  extends BaseComponent implements OnInit{
  public phonepathlist = [{"fullName":"宋家准","identityNumber":"410426198811151012","mobile":"18210230496"},
  {"fullName":"宋家准q","identityNumber":"410426198811151012","mobile":"18210230496"}];
  private parmar ={};
  ngOnInit(){
   this.parmar = this.getNavParams().data;
   console.log("---path---"+JSON.stringify(this.parmar));
   this.setTitleByAssets("text-company-path-deatils");
  }

  onNext(item){

  }
}
