import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {PhoneauthPage} from '../../../pages/id/phoneauth/phoneauth';
@Component({
  selector: 'page-phonepathinfo',
  templateUrl: 'phonepathinfo.html',
})
export class PhonepathinfoPage  extends BaseComponent implements OnInit{
  public phonepathlist = [];
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
       this.phonepathlist.push(pathList[key]);
    }


  });
  }

  onNext(item){

  }

  onCommit(){
    this.Go(PhoneauthPage,this.parmar);
  }
}
