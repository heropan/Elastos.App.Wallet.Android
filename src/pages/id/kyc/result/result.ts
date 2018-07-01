import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdHomeComponent} from "../../../../pages/id/home/home";
import {IDManager} from "../../../../providers/IDManager";
//{notary:"COOIX"}

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

  message:any={ID:"12233333",Path:"1",Proof:"123444",datahash:"1111111",sing:"11111111"};
  passworld:string="s12345678";
  programJson:string;
  fromAddress:string;
  fee:number;
  did:string;
  idObj:any={};
  ngOnInit(){
    this.setTitleByAssets('text-kyc-result');
    this.idObj = this.getNavParams().data;
    alert("====="+JSON.stringify(this.idObj));
    this.did = this.idObj["id"];
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
    // this.popupProvider.ionicConfirm('confirmTitle', 'confirmSubTitle').then(() => {

    // });
    this.didGenerateProgram();
  }

  didGenerateProgram(){

    this.walletManager.didGenerateProgram(this.did,JSON.stringify(this.message),this.passworld,(result)=>{
                   this.programJson  = result.value;
                   alert("====2222===="+JSON.stringify(this.programJson));
                   this.createfromAddress();
    });
  }

  createfromAddress(){
    this.walletManager.createAddress("IdChain",(result)=>{
              alert(JSON.stringify(result));
              this.fromAddress = result.address;
              alert("this.fromAddress====="+this.fromAddress);
              //this.cauFee();
    });
  }

  cauFee(){
     this.walletManager.createIdTransaction("IdChain",this.fromAddress,"",0,this.message,this.programJson,0,"","",(result)=>{
             alert("sssssssssss11=="+JSON.stringify(result));
             let rawTransaction = result['transactionId'].toString();
             alert(rawTransaction);
             this.calculateTransactionFee(rawTransaction);
     });
  }

  calculateTransactionFee(rawTransaction){
     this.walletManager.calculateTransactionFee("IdChain", rawTransaction,10000, (data) => {
      this.fee = data['fee'];
     });
  }


  createDepositTransaction(){
      this.walletManager.createDepositTransaction("ELA","","11111",this.fee,this.fromAddress,"qq","1",0.1,"","",(result)=>{

      });
  }


  caulmessage(){

     //kyc 内容
     let kycContent={ "word":"xxx公司",
                      "legalPerson":"张三",
                      "registrationNum":"91311117011111111K"
                    };
     //kyc 结果
     let authSign = {
                     signature: "26d72d2ca4a8da5ab8a58d1330fc6bb9cd5ab966789fe9d945afe355974da02d00da42310fd1f099f5192db9b0a6838254f62ffd1c0a6f2245d4f7b5f881f6fc",
                     notary:"COOIX"
                    }

     let authDataHash = IDManager.hash(JSON.stringify(kycContent)+JSON.stringify(authSign));

     let kycChainDataHash = IDManager.hash(authDataHash+JSON.stringify(authSign));

     let singObj = {ID:"sdfghjjk",Path:"1",Proof:authSign,datahash:kycChainDataHash};

     this.walletManager.didSign(this.did,JSON.stringify(singObj),this.passworld,(result)=>{
               this.message = {ID:this.did,Path:"1",Proof:authSign,datahash:kycChainDataHash,sign:result.value};
     });
 }











}
