import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";

@Component({
  selector: 'page-bankcardpathinfo',
  templateUrl: 'bankcardpathinfo.html',
})
export class BankcardpathinfoPage extends BaseComponent implements OnInit{
  public backcardList =[{"fullName":"宋家准","identityNumber":"410426198811151012","cardMobile":"18310230498","cardNumber":"6225260167820399"},
                        {"fullName":"宋家准1","identityNumber":"410426198811151012","cardMobile":"18310230498","cardNumber":"6225260167820399"}];
  private parmar ={};
  ngOnInit(){
   this.parmar = this.getNavParams().data;
   console.log("---path---"+JSON.stringify(this.parmar));
   this.setTitleByAssets("text-bankcard-path-deatils");
  }

  onNext(item){

  }
}
