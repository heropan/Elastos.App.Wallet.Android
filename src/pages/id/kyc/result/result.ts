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

  personObj={
     fullName:'sss',
     identityNumber:'410426198811151012'
  }

  phoneObj={
    fullName:'sss',
    identityNumber:'410426198811151012',
    mobile:'18210230496'
  }

  debitObj={
    fullName:'sss',
    identityNumber:'410426198811151012',
    cardNumber:'6225260167820399',
    cardMobile:'18210230496'
  }

  message:any={Id:"",Path:"",Proof:"",DataHash:"",Sign:""};
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

    if(this.idObj["type"] === "company"){
           this.getCompany();
    }else{
           this.getPerson();
    }

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
    this.message["Path"] = adata["type"];
    this.approdType = adata["type"];
    this.businessObj["word"] = companyObj["word"];
    this.businessObj["legalPerson"] = companyObj["legalPerson"];
    this.businessObj["registrationNum"] = companyObj["RegistrationNum"];
    this.signature = companyObj["signature"];
  }

  getPerson(){
    let index = this.idObj["adata"].length-1;
    let adata = this.idObj["adata"][index];
    let pesronObj = adata["retdata"];
    this.message["Path"] = adata["type"];
    this.approdType =  adata["type"];
    if(this.message["Path"] === "identityCard"){
         this.personObj["fullName"] = pesronObj["fullName"];
         this.personObj["identityNumber"] = pesronObj["identityNumber"];
         this.signature = pesronObj["signature"];
    }else if(this.message["Path"] === "phone"){
         this.phoneObj["fullName"] =  pesronObj["fullName"];
         this.phoneObj["identityNumber"] =  pesronObj["identityNumber"];
         this.phoneObj["mobile"] = pesronObj["mobile"];
         this.signature = pesronObj["signature"];
    }else if(this.message["Path"] === "bankCard"){
        this.debitObj["fullName"] =  pesronObj["fullName"];
        this.debitObj["identityNumber"] =  pesronObj["identityNumber"];
        this.debitObj["cardNumber"] = pesronObj["cardNumber"];
        this.debitObj["cardMobile"] = pesronObj["cardMobile"];
        this.signature = pesronObj["signature"];
    }

  }

  onCommit(){
    alert("onCommit begin");
    // this.popupProvider.ionicConfirm('confirmTitle', 'confirmSubTitle').then(() => {

    // });
    this.didGenerateProgram();
  }

  didGenerateProgram(){
    alert("didGenerateProgram did"+this.did);
    alert("didGenerateProgram message"+ JSON.stringify(this.message));
    alert("didGenerateProgram passworld"+ this.passworld);
    console.log("---didGenerateProgram----"+"message="+JSON.stringify(this.message)+"passworld"+this.passworld);

    console.log("---didGenerateProgram DataHash.length----"+ this.message.DataHash.length);
    console.log("---didGenerateProgram----Sign.length"+ this.message.Sign.length);
    console.log("---didGenerateProgram----Proof"+  this.message.Proof);

    console.log("---didGenerateProgram----Proof"+ JSON.stringify(this.message.Proof) );

    this.walletManager.didGenerateProgram(this.did,JSON.stringify(this.message),this.passworld,(result)=>{
                   this.programJson  = result.value;
                   alert("====didGenerateProgram===="+JSON.stringify(this.programJson));

                   console.log("ElastosJs didGenerateProgram programJson "+JSON.stringify(this.programJson));
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

    alert("createIdTransaction before" + this.fromAddress);
    this.walletManager.createIdTransaction("IdChain","",this.message,this.programJson,"","",(result)=>{
            console.log("---createIdTransaction---"+"fromAddress="+this.fromAddress+"message="+JSON.stringify(this.message)+"programJson="+this.programJson);
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
     let kycContent={};
     if(this.message["Path"] === "enterprise"){
         kycContent = this.businessObj;
     }else if(this.message["Path"] === "identityCard"){
            kycContent = this.personObj;
     }else if(this.message["Path"] === "phone"){
            kycContent = this.phoneObj;
     }else if(this.message["Path"] === "bankCard"){
            kycContent = this.debitObj;
     }
     //kyc 结果
     let authSign = {
                     signature:this.signature,
                     notary:"COOIX"
                    }
    console.log("caulmessage this.signature " +this.signature);
    console.log("caulmessage this.signature " +this.signature);

    //alert("caulmessage signature"+ this.signature.length);

    let authDataHash = IDManager.hash(JSON.stringify(kycContent)+JSON.stringify(authSign));

    alert("caulmessage 2"+ authDataHash);


    let kycChainDataHash = IDManager.hash(authDataHash+JSON.stringify(authSign));

    console.log("caulmessage kycChainDataHash.length " +kycChainDataHash.length);

    alert("caulmessage 3"+ kycChainDataHash);

    let singObj = {Id:this.did,Path:"1",Proof:authSign,DataHash:kycChainDataHash};

     this.walletManager.didSign(this.did,JSON.stringify(singObj),this.passworld,(result)=>{
       alert("didSign 4"+ JSON.stringify(result));

       let proofString = JSON.stringify(authSign);
       alert("didSign proofString"+ proofString);

       this.message = {Id:this.did,Path:"1",Proof: proofString,DataHash:kycChainDataHash,Sign:result.value};

       console.log("caulmessage Sign " +result.value + " result.value length "+ result.value.length);
       alert("didSign 5"+ JSON.stringify(this.message));

     });
 }


 sendRawTransaction( rawTransaction){
    alert("sendRawTransaction begin==");

    this.walletManager.sendRawTransaction("IdChain",rawTransaction,this.fee,this.passworld,(result)=>{
      console.log("---sendRawTransaction---"+"rawTransaction="+rawTransaction+"fee="+this.fee);
      alert("sendRawTransaction result"+JSON.stringify(result));
    })
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
