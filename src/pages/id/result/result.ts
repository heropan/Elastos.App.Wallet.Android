import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {IdHomeComponent} from "../../../pages/id/home/home";

@Component({
  selector: 'id-kyc-result',
  templateUrl: './result.html',
})
export class IdResultComponent extends BaseComponent implements OnInit{
  type: string;
  ngOnInit() {
    this.setTitleByAssets('text-commit-result');
    let status = this.getNavParams().get("status");
    if(this.isNull(status)){
      this.type = '0';
    }else{
      this.type = status;
    }

    this.setLeftIcon("",()=>{this.Go(IdHomeComponent)});
  }

}
