import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdHomeComponent} from "../../../../pages/id/home/home";
import {IDManager} from "../../../../providers/IDManager";
import { Config } from '../../../../providers/Config';
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

  message:any={Id:"12233333",Path:"1",Proof:"123444",DataHash:"1111111",Sign:"11111111"};
  passworld:string="s12345678";
  programJson:string;
  fromAddress:string;
  fee:number;
  did:string;
  idObj:any={};
 depositTransaction:string;
 depositTransactionFee:number;
 signature:string;
 ngOnInit(){
    this.setTitleByAssets('text-kyc-result');
    this.idObj = this.getNavParams().data;
    alert("====="+JSON.stringify(this.idObj));
    // this.did = this.idObj["parms"]["id"];
    // this.businessObj.word = this.idObj["parms"]["word"];
    // this.businessObj.legalPerson = this.idObj["parms"]["legalPerson"];
    // this.businessObj.registrationNum = this.idObj["parms"]["registrationNum"];
    // this.signature = this.idObj["parms"]["signature"];
    this.message["Id"]=  this.did;
    //this.caulmessage();
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
                   alert("====didGenerateProgram===="+JSON.stringify(this.programJson));
                   this.createfromAddress();
    });
  }

  createfromAddress(){
    this.walletManager.createAddress("IdChain",(result)=>{
              alert(JSON.stringify(result));
              this.fromAddress = result.address;
              alert("createfromAddress this.fromAddress====="+this.fromAddress);
              this.cauFee();
    });
  }

  cauFee(){
     this.walletManager.createIdTransaction("IdChain","",this.fromAddress,0,this.message,this.programJson,0,"","",(result)=>{
             alert("createIdTransaction result =="+JSON.stringify(result));
             let rawTransaction = result['json'].toString();
             //alert(rawTransaction);
             alert("createIdTransaction rawTransaction =="+rawTransaction);

             this.calculateTransactionFee(rawTransaction);
     });
  }

  calculateTransactionFee(rawTransaction){
    alert("calculateTransactionFee begin ==");
     this.walletManager.calculateTransactionFee("IdChain", rawTransaction,10000, (data) => {
      alert("calculateTransactionFee data=="+JSON.stringify(data));

      this.fee = data['fee'];
      console.log("Elastos 111111111111111");
      console.log("rawTransaction" + JSON.stringify(rawTransaction));
      alert("calculateTransactionFee fee=="+JSON.stringify(this.fee));
      this.sendRawTransaction(rawTransaction);
     });
  }



  caulmessage(){

     //kyc 内容
     let kycContent=this.businessObj;
     //kyc 结果
     let authSign = {
                     signature:this.signature,
                     notary:"COOIX"
                    }

     let authDataHash = IDManager.hash(JSON.stringify(kycContent)+JSON.stringify(authSign));

     let kycChainDataHash = IDManager.hash(authDataHash+JSON.stringify(authSign));

     let singObj = {Id:"sdfghjjk",Path:"1",Proof:authSign,DataHash:kycChainDataHash};

     this.walletManager.didSign(this.did,JSON.stringify(singObj),this.passworld,(result)=>{
               this.message = {ID:this.did,Path:"1",Proof:authSign,DataHash:kycChainDataHash,Sign:result.value};
     });
 }


 sendRawTransaction( rawTransaction){
    alert("sendRawTransaction begin==");

    this.walletManager.sendRawTransaction("IdChain",rawTransaction,this.fee,this.passworld,(result)=>{
      alert("sendRawTransaction result"+JSON.stringify(result));

    })
 }


 //从主链转一批钱到测链

createDepositTransaction(){
  this.walletManager.createDepositTransaction("ELA","","XQd1DCi6H62NQdWZQhJCRnrPn7sF9CTjaU",this.fee,this.fromAddress,"qq",this.fee+"",20000,"","",(result)=>{
            this.depositTransaction = result['transactionId'].toString();
            //this.getDepositTransaction();
  });
}

getDepositTransaction(){
  this.walletManager.calculateTransactionFee("ELA",this.depositTransaction,10000, (data) => {
    this.depositTransactionFee = data['fee'];
  });
}

 sendDepositTransaction(){
     this.walletManager.sendRawTransaction("ELA",this.depositTransaction,20000,this.passworld,(result)=>{

     })
 }















}
