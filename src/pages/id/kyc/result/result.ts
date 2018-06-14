import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdHomeComponent} from "../../../../pages/id/home/home";


@Component({
  selector: 'app-kyc-result',
  templateUrl: 'result.html',
})
export class IdKycResultComponent extends BaseComponent implements OnInit{
  type: string;
  ngOnInit(){
    this.setTitleByAssets('text-kyc-result');

    if(this.isNull(status)){
      this.type = '0';
    }else{
      this.type = status;
    }

    this.setLeftIcon('',()=>{
           this.Go(IdHomeComponent);
    });
  }

  onCommit(){

  }

}
