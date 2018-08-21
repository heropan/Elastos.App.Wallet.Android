import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {BankcardauthPage} from '../../../pages/id/bankcardauth/bankcardauth';
@Component({
  selector: 'page-bankcardpathinfo',
  templateUrl: 'bankcardpathinfo.html',
})
export class BankcardpathinfoPage extends BaseComponent implements OnInit{
  public backcardList =[];
  private parmar ={};
  public idsObj ={};
  ngOnInit(){
   this.parmar = this.getNavParams().data;
   console.log("---path---"+JSON.stringify(this.parmar));
   this.setTitleByAssets("text-bankcard-path-deatils");
   this.localStorage.get("kycId").then((val)=>{
    if(val == null || val === undefined || val === {} || val === ''){
      return;
     }
    this.idsObj = JSON.parse(val);

    let pathList = this.idsObj[this.parmar["id"]][this.parmar["path"]];

    for(let key in pathList){
       this.backcardList.push(pathList[key]);
    }


  });
  }

  onNext(item){

  }

  onCommit(){
    this.Go(BankcardauthPage,this.parmar);
  }
}
