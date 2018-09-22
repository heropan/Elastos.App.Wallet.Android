import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdHomeComponent} from "../../../../pages/id/home/home";
import {IDManager} from "../../../../providers/IDManager";
import { Config } from '../../../../providers/Config';
//{notary:"COOIX"}

@Component({
  selector: 'page-company-write-chain',
  templateUrl: 'company-write-chain.html',
})
export class CompanyWriteChainPage extends BaseComponent implements OnInit{
  masterWalletId:string = "1";
  type: string;
  approdType:string="enterprise";
  businessObj={
    "word":"",
    "legalPerson":"",
    "registrationNum":"",
  }

  message:any={Id:"",Path:"",Proof:"",DataHash:"",Sign:""};
  passworld:string="";
  programJson:string;
  fromAddress:string;
  fee:number;
  did:string;
  idObj:any={};
 depositTransaction:string;
 depositTransactionFee:number;
 signature:string;
 orderStatus = 0;
 serialNum = "";
 ngOnInit(){
    this.events.subscribe("order:update",(orderStatus,appr)=>{
           if(appr === "enterprise"){
             this.orderStatus = orderStatus;
           }
    });
    this.setTitleByAssets('text-kyc-result');
    this.idObj = this.getNavParams().data;


    console.info("ElastJs ngOnInit this.idObj " + JSON.stringify(this.idObj));

    this.orderStatus = this.idObj["pathStatus"];
    this.serialNum = this.idObj["serialNum"];
    console.log("ngOnInit ====="+JSON.stringify(this.idObj));
    this.did = this.idObj["payObj"]["did"];
    this.getCompany();
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

  onCommit(){
    this.popupProvider.presentPrompt().then((val)=>{
              if(this.isNull(val)){
                this.messageBox("text-id-kyc-prompt-password");
                return;
              }
              this.passworld = val.toString();
              this.caulmessageNew();
    }).catch(()=>{

    });
    //this.didGenerateProgram();
  }

  didGenerateProgram(){

    console.log("---didGenerateProgram----"+"message="+JSON.stringify(this.message)+"passworld"+this.passworld);
    //console.log("---didGenerateProgram DataHash.length----"+ this.message.DataHash.length);
    //console.log("---didGenerateProgram----Sign.length"+ this.message.Sign.length);
    //console.log("---didGenerateProgram----Proof"+  this.message.Proof);
    //console.log("---didGenerateProgram----Proof"+ JSON.stringify(this.message.Proof) );

    this.walletManager.didGenerateProgram(this.did,JSON.stringify(this.message),this.passworld,(result)=>{
                   this.programJson  = result.value;
                   console.log("ElastosJs didGenerateProgram programJson "+JSON.stringify(this.programJson));
                   this.createfromAddress();
    });
  }

  createfromAddress(){
    this.walletManager.createAddress(this.masterWalletId,"IdChain",(result)=>{
              this.fromAddress = result.address;
              this.cauFee();
    });
  }

  cauFee(){

    //alert("createIdTransaction before" + this.fromAddress);
    this.walletManager.createIdTransaction(this.masterWalletId,"IdChain","",this.message,this.programJson,"","",(result)=>{
            console.log("---createIdTransaction---"+"fromAddress="+this.fromAddress+"message="+JSON.stringify(this.message)+"programJson="+this.programJson);
             let rawTransaction = result['json'].toString();
             console.log("createIdTransaction rawTransaction =="+rawTransaction);
             this.calculateTransactionFee(rawTransaction);
     });
  }

  calculateTransactionFee(rawTransaction){
     this.walletManager.calculateTransactionFee(this.masterWalletId,"IdChain", rawTransaction,10000, (data) => {

      this.fee = data['fee'];
      //console.log("Elastos 111111111111111");
      console.log("rawTransaction" + JSON.stringify(rawTransaction));
      console.log("calculateTransactionFee fee=="+JSON.stringify(this.fee));
      this.popupProvider.presentConfirm(this.fee/Config.SELA).then(()=>{
            this.sendRawTransaction(rawTransaction);
      });

     });
  }

//////////////////////
  getKycContent( authData){

    let retContent = {};

    switch (authData.type)
    {
      case "identityCard":
        retContent["fullName"] = authData["retdata"]["fullName"];
        retContent["identityNumber"] = authData["retdata"]["identityNumber"];
        break;

      case "phone":
        retContent["fullName"] =  authData["retdata"]["fullName"];
        retContent["identityNumber"] =  authData["retdata"]["identityNumber"];
        retContent["mobile"] = authData["retdata"]["mobile"];
        break;

      case "bankCard":
        retContent["fullName"] =  authData["retdata"]["fullName"];
        retContent["identityNumber"] =  authData["retdata"]["identityNumber"];
        retContent["cardNumber"] = authData["retdata"]["cardNumber"];
        retContent["cardMobile"] = authData["retdata"]["mobile"];
        break;

      case "enterprise":
        retContent["word"] = authData["retdata"]["word"];
        retContent["legalPerson"] = authData["retdata"]["legalPerson"];
        retContent["registrationNum"] = authData["retdata"]["RegistrationNum"];
        break;
    }
    return retContent;
  }
// authtype is one of  person company
/*
*
* {
	"serialNum": "VIN1533555041238630",
	"pathStatus": 2,
	"payObj": {
		"did": "ihWrYTvJ4FYHBuQ5mwmTNTVXenSfvWHDy9",
		"addr": "EKZCcfqBP1YXiDtJVNdnLQR74QRHKrgFYD",
		"money": "0.1",
		"appType": "kyc",
		"chianId": "ELA",
		"selectType": "enterprise",
		"parms": {
			"type": "enterprise",
			"word": "北京比特大陆科技有限公司",
			"legalPerson": "詹克团",
			"registrationNum": "911101080804655794",
			"serialNum": "VIN1533555041238630"
		}
	},
	"txHash": "fc812077fba108ab407166eb284b3780ad03da893d73f118ffb241c9533128af",
	"adata": [{
		"type": "enterprise",
		"result": "success",
		"retdata": {
			"app": "b1c0b7028c8c4be3beafc4c4812ae92e",
			"signature": "04c7a7e1b062d4692172f8bf9cad0b54d99a780d88c674dece9956bead38c228b53ebdaeb7f2d10b2804f7dd18aa764dcf9a12f7e27ccc3b949965db93ffd46a",
			"RegistrationNum": "911101080804655794",
			"legalPerson": "詹克团",
			"word": "北京比特大陆科技有限公司",
			"authid": "12345678",
			"ts": "1535090480"
		},
		"message": "认证成功",
		"timestamp": "1535090608902"
	}]
}
* */
  // authData is one of  adata


  getcontent(authData){

    let retContent = {};
    retContent["Path"] = 'kyc' +'/' + authData["type"];
    retContent["Values"] = [];

    let proofObj = {
      signature : authData["resultSign"],
      notary : "COOIX"
    }



    let valueObj = {};
    valueObj["Proof"] = JSON.stringify(proofObj);


    let kycContent = this.getKycContent( authData);
    console.info("ElastJs company getcontent kycContent "+ JSON.stringify(kycContent));
    console.info("ElastJs company getcontent Proof "+ valueObj["Proof"]);

    let authDataHash = IDManager.hash(JSON.stringify(kycContent)+valueObj["Proof"]);

    valueObj["DataHash"] = IDManager.hash(authDataHash+valueObj["Proof"]);

    let idJsonPart = {};
    idJsonPart["hash"] = valueObj["DataHash"];
    idJsonPart["KycContent"] = kycContent;
    idJsonPart["Proof"] = valueObj["Proof"];
    this.dataManager.addIdPathJson(this.did, retContent["Path"], idJsonPart)

    retContent["Values"].push(valueObj)
    console.info("ElastJs company getcontent retContent "+ JSON.stringify(retContent));
    return retContent;
  }

  caulmessageNew(){

    //
    ///////////////////////
    let signMessage= {};

    signMessage["Id"] = this.did ;//
    //signMessage["Sign"] = "" ;//
    signMessage["Contents"] =[];

    let content ;
    let params = this.idObj;//

    for (let ele of params.adata) {
      content = this.getcontent( ele);
      signMessage["Contents"].push(content);
    }

    console.log("caulmessageNew "+JSON.stringify(signMessage));
    //alert("caulmessageNew "+JSON.stringify(signMessage));

    this.walletManager.didSign(this.did,JSON.stringify(signMessage),this.passworld,(result)=>{
      this.message = {
        Id : this.did,
        Sign :result.value,
        Contents: signMessage["Contents"],
      };

      this.didGenerateProgram();
    });
  }
////////////////////////

  caulmessage(){

     //kyc 内容
     let kycContent={};
         kycContent = this.businessObj;
         this.message["Path"] = 'kyc'+"|"+"company"+"|"+"enterprise";
     //kyc 结果
     let authSign = {
                     signature:this.signature,
                     notary:"COOIX"
                    }
    console.log("caulmessage this.signature " +this.signature);
    console.log("caulmessage this.signature " +this.signature);

    let authDataHash = IDManager.hash(JSON.stringify(kycContent)+JSON.stringify(authSign));

    //console.log("caulmessage 2"+ authDataHash);


    let kycChainDataHash = IDManager.hash(authDataHash+JSON.stringify(authSign));

    console.log("caulmessage kycChainDataHash.length " +kycChainDataHash.length);

    //console.log("caulmessage 3"+ kycChainDataHash);

    let singObj = {Id:this.did,Path:this.message["Path"],Proof:authSign,DataHash:kycChainDataHash};

     this.walletManager.didSign(this.did,JSON.stringify(singObj),this.passworld,(result)=>{
      console.log("didSign 4"+ JSON.stringify(result));

       let proofString = JSON.stringify(authSign);
       //console.log("didSign proofString"+ proofString);

       this.message = {Id:this.did,Path:this.message["Path"],Proof: proofString,DataHash:kycChainDataHash,Sign:result.value};
       this.didGenerateProgram();
       //console.log("caulmessage Sign " +result.value + " result.value length "+ result.value.length);
       //console.log("didSign 5"+ JSON.stringify(this.message));

     });
 }


  sendRawTransaction( rawTransaction){
    //alert("sendRawTransaction begin==");

  //   this.walletManager.sendRawTransaction(this.masterWalletId,"IdChain",rawTransaction,this.fee,this.passworld,(result)=>{


  //     let rawTransactionObj = JSON.parse(rawTransaction);

  //     console.log("ElastosJs ---sendRawTransaction---"+"rawTransaction="+JSON.stringify(rawTransactionObj)+"fee="+this.fee);
  //     //console.log("ElastosJs ---sendRawTransaction--- PayLoad"+ JSON.stringify(rawTransactionObj.PayLoad));

  //     if (!rawTransactionObj.PayLoad) {
  //       console.log("ElastosJs ---sendRawTransaction--- PayLoad NULL");
  //       return;
  //     }

  //     if (!rawTransactionObj["PayLoad"]["Contents"]){
  //       console.log("ElastosJs ---sendRawTransaction--- Contents NULL");
  //       return ;
  //     }
  //     /*
  //     *
  //     *
  //     "PayLoad": {
	// 	"Contents": [{
	// 		"Path": "kyc/company/enterprise",
	// 		"Values": [{
	// 			"DataHash": "7f6d1d62480d06e939999f33cc9f3802602236dccfb8243a2e74176b9fb905ab",
	// 			"Proof": "{\"signature\":\"c82657ce310aa4313fd95272f3e52a28b6c4ec9fd2461d1047db5e86edf289995576d9bd3304d938a7bb66cab196258751b6a3c7e7d76b4867588fa827d4de58\",\"notary\":\"COOIX\"}"
	// 		}]
	// 	}],
	// 	"Id": "ifrQqG7kiqqSxGfHN62QPyRZD88ggK6MdD",
	// 	"Sign": "4029d9695dfd5919de9f05b4bd48beb93b33fcb960276cfbbc29ae47365cbb601ea68eceb98ed3c888474b01e66231fccfcef9d633c76e6d513af995e7fd60bd66"
	// } */

  //     for (let ele of rawTransactionObj["PayLoad"]["Contents"] ) {
  //       console.log("ElastosJs company-write-chain ---sendRawTransaction--- ele " + JSON.stringify(ele));
  //       let arr = ele["Path"].split("/");

  //       if (arr[1]) {
  //         let self = this;
  //         //iterat values
  //         for (let valueObj of ele["Values"]){
  //           let proofObj = JSON.parse(valueObj["Proof"]);

  //           this.localStorage.getSeqNumObj(proofObj["signature"], rawTransactionObj.PayLoad.Id, arr[1], function (reult : any) {
  //             console.info("ElastosJs reult " + JSON.stringify(reult) );
  //             self.dataManager.addSeqNumObj(proofObj["signature"] , reult );

  //           });
  //         }
  //       }
  //     }
  //     console.log("ElastosJs company-write-chain setOrderStatus(4) ");

  //     this.setOrderStatus(4);
  //     //this.messageBox("text-id-kyc-china");
  //   })
  }




getDepositTransaction(){
  this.walletManager.calculateTransactionFee(this.masterWalletId,"ELA",this.depositTransaction,10000, (data) => {
    this.depositTransactionFee = data['fee'];
  });
}


 setOrderStatus(status){
       console.info("ElastJs setOrderStatus status begin" + status);
       let serids = Config.getSerIds();
       let serid = serids[this.serialNum];
       let did = serid["id"];
       let path = serid["path"];
       let idsObj = {};
       this.localStorage.getKycList("kycId").then((val)=>{
           if(val == null || val === undefined || val === {} || val === ''){
             console.info("setOrderStatus val == null return ");
             return;
           }
        idsObj = JSON.parse(val);
        idsObj[did][path][this.serialNum]["pathStatus"] = status;
        this.localStorage.set("kycId",idsObj).then(()=>{
          console.info("ElastJs setOrderStatus  end  status " + status);
                 this.orderStatus = status;
        });
       });
 }
}
