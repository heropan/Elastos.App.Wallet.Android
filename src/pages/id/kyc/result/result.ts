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
    alert("ngOnInit ====="+JSON.stringify(this.idObj));
    this.did = this.idObj["id"];

    // if(this.idObj["type"] === "company"){
    //        this.getCompany();
    // }else{
    //        this.getPerson();
    // }

    this.caulmessage();
    if(this.isNull(status)){
      this.type = '0';
    }else{
      this.type = status;
    }
    this.setLeftIcon('',()=>{
           this.Go(IdHomeComponent);
    });
  }

  getCompany(){
    let adata = this.idObj["adata"][0];
    let companyObj = adata["retdata"];
    this.businessObj["word"] = companyObj["word"];
    this.businessObj["legalPerson"] = companyObj["legalPerson"];
    this.businessObj["registrationNum"] = companyObj["registrationNum"];
    this.signature = companyObj["signature"];
  }

  getPerson(){

  }

  onCommit(){
    alert("onCommit begin");
    // this.popupProvider.ionicConfirm('confirmTitle', 'confirmSubTitle').then(() => {

    // });
    this.didGenerateProgram();
  }

  didGenerateProgram(){
    //alert("didGenerateProgram did"+this.did);
    //alert("didGenerateProgram message"+ JSON.stringify(this.message));
    //alert("didGenerateProgram passworld"+ this.passworld);
    //console.log("---didGenerateProgram----"+"did="+this.did+"message="+JSON.stringify(this.message)+"passworld"+this.passworld);
    this.walletManager.didGenerateProgram(this.did,JSON.stringify(this.message),this.passworld,(result)=>{
                   this.programJson  = result.value;
                   alert("====didGenerateProgram===="+JSON.stringify(this.programJson));
                   this.createfromAddress();
    });
  }

  createfromAddress(){
    this.walletManager.createAddress("IdChain",(result)=>{
             // alert(JSON.stringify(result));
              this.fromAddress = result.address;
             // alert("createfromAddress this.fromAddress====="+this.fromAddress);
              this.cauFee();
    });
  }

  cauFee(){

    alert("createIdTransaction before" + this.fromAddress);
    this.walletManager.createIdTransaction("IdChain","",this.message,this.programJson,"","",(result)=>{
            //console.log("---createIdTransaction---"+"fromAddress="+this.fromAddress+"message="+JSON.stringify(this.message)+"programJson="+this.programJson);
             alert("createIdTransaction result =="+JSON.stringify(result));
             let rawTransaction = result['json'].toString();
             //alert(rawTransaction);
             //alert("createIdTransaction rawTransaction =="+rawTransaction);

             this.calculateTransactionFee(rawTransaction);
     });
  }

  calculateTransactionFee(rawTransaction){
    alert("calculateTransactionFee begin ==");
     this.walletManager.calculateTransactionFee("IdChain", rawTransaction,10000, (data) => {
      alert("calculateTransactionFee data=="+JSON.stringify(data));

      this.fee = data['fee'];
     // console.log("Elastos 111111111111111");
      //console.log("rawTransaction" + JSON.stringify(rawTransaction));
      //alert("calculateTransactionFee fee=="+JSON.stringify(this.fee));
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

    //alert("caulmessage 1");

    let authDataHash = IDManager.hash(JSON.stringify(kycContent)+JSON.stringify(authSign));

    //alert("caulmessage 2"+ authDataHash);

    let kycChainDataHash = IDManager.hash(authDataHash+JSON.stringify(authSign));

    //alert("caulmessage 3"+ kycChainDataHash);

    let singObj = {Id:this.did,Path:"1",Proof:authSign,DataHash:kycChainDataHash};

     this.walletManager.didSign(this.did,JSON.stringify(singObj),this.passworld,(result)=>{
       alert("didSign 4"+ JSON.stringify(result));

       let proofString = JSON.stringify(authSign);
       alert("didSign proofString"+ proofString);

       this.message = {Id:this.did,Path:"1",Proof: proofString,DataHash:kycChainDataHash,Sign:result.value};
       alert("didSign 5"+ JSON.stringify(this.message));

     });
 }


 sendRawTransaction( rawTransaction){
    alert("sendRawTransaction begin==");

    this.walletManager.sendRawTransaction("IdChain",rawTransaction,this.fee,this.passworld,(result)=>{
      ////////////////
      alert("sendRawTransaction result"+JSON.stringify(result));

      // if (result['ERRORCODE'] == undefined) {
      //   //this.Go(TabsComponent);
      //   this.walletManager.registerIdListener(this.did, (data) => {
      //     ////////////////
      //     alert("sendRawTransaction registerIdListener data "+ JSON.stringify(data));
      //
      //   });
      //
      // } else {
      //   this.toast('text-password-error');
      // }
    });

    //})
 }


 //从主链转一批钱到测链

createDepositTransaction(){
  this.walletManager.createDepositTransaction("ELA","","XQd1DCi6H62NQdWZQhJCRnrPn7sF9CTjaU",this.fee,this.fromAddress,"qq",this.fee+"","","",(result)=>{
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
       alert("sendDepositTransaction result"+JSON.stringify(result));
     })
 }















}
