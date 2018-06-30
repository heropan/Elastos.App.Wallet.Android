import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdHomeComponent} from "../../../../pages/id/home/home";


@Component({
  selector: 'app-kyc-result',
  templateUrl: 'result.html',
})
export class IdKycResultComponent extends BaseComponent implements OnInit{
  type: string;
  approdType:string="company";
  businessObj={
    "word":"xxx公司",
    "legalPerson":"张三",
    "registrationNum":"91311117011111111K",
  }
  message:string="1234555555555";
  passworld:string="s12345678";
  programJson:string;
  fromAddress:string;
  fee:number;
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
    this.popupProvider.ionicConfirm('confirmTitle', 'confirmSubTitle').then(() => {

    });
  }

  didGenerateProgram(){
    this.walletManager.didGenerateProgram(this.message,this.passworld,(result)=>{
                   alert("====11111===="+JSON.stringify(result));
                   this.programJson  = result.value;
                   alert("====2222===="+JSON.stringify(this.programJson));
    });
  }

  createfromAddress(){

    this.walletManager.createAddress("ELA",(result)=>{
              this.fromAddress = result.address;
              this.cauFee();
    });
  }

  cauFee(){
     this.walletManager.createIdTransaction("IDChain",this.fromAddress,"",0,this.message,this.programJson,0,"","",(result)=>{
             alert("sssssssssss11=="+JSON.stringify(result));
             let rawTransaction = result['transactionId'].toString();
             alert(rawTransaction);
             this.calculateTransactionFee(rawTransaction);
     });
  }

  calculateTransactionFee(rawTransaction){
     this.walletManager.calculateTransactionFee("ELA", rawTransaction,10000, (data) => {
      this.fee = data['fee'];
     });
  }


  createDepositTransaction(){
      this.walletManager.createDepositTransaction("IdChina","","11111",this.fee,this.fromAddress,"qq","1",0.1,"","",(result)=>{

      });
  }











}
