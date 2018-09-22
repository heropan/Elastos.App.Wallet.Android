import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";
import {IdHomeComponent} from "../../../../pages/id/home/home";
import {IDManager} from "../../../../providers/IDManager";
import { Config } from '../../../../providers/Config';
//{notary:"COOIX"}

@Component({
  selector: 'page-person-write-chain',
  templateUrl: 'person-write-chain.html',
})
export class PersonWriteChainPage extends BaseComponent implements OnInit{
  masterWalletId:string ="1";
  type: string;
  pageObj = {};
  personObj={
     fullName:'sss',
     identityNumber:'410426198811151012',
     mobile:'18210230496',
     cardNumber:'6225260167820399',
     cardMobile:'18210230496'
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
   let self = this;
   this.events.subscribe("order:update",(orderStatus,appr)=>{
     console.log("ElastJs ngOnInit  orderStatus "+orderStatus + " appr " + appr);

     if(appr != "enterprise"){

       self.orderStatus = orderStatus;//
       console.log("ElastJs ngOnInit 111 appr !=orderStatus "+orderStatus + " appr " + appr);

     }
   });
    this.setTitleByAssets('text-kyc-result');
    this.idObj = this.getNavParams().data;
    console.log("ElastJs ngOnInit idObj"+JSON.stringify(this.idObj));
   this.did = this.idObj["payObj"]["did"];

   console.info("ElastJs ngOnInit pathStatus " +this.idObj["pathStatus"])
    this.orderStatus = this.idObj["pathStatus"];
    this.serialNum = this.idObj["serialNum"];
    this.getPerson();
    if(this.isNull(status)){
      this.type = '0';
    }else{
      this.type = status;
    }
    this.setLeftIcon('',()=>{
           this.Go(IdHomeComponent);
    });
   console.info("ElastJs ngOnInit end " )

 }
  getPerson(){
    this.pageObj = this.getPageObj(this.idObj["adata"]);
    let index = this.idObj["adata"].length-1;
    let adata = this.idObj["adata"][index];
    //let pesronObj = adata["retdata"];

    this.message["Path"] = adata["type"];
    // this.approdType =  adata["type"];
    // if(this.message["Path"] === "identityCard"){
    //      this.personObj["fullName"] = pesronObj["fullName"];
    //      this.personObj["identityNumber"] = pesronObj["identityNumber"];
    //      this.signature = pesronObj["signature"];
    // }else if(this.message["Path"] === "phone"){
    //      this.phoneObj["fullName"] =  pesronObj["fullName"];
    //      this.phoneObj["identityNumber"] =  pesronObj["identityNumber"];
    //      this.phoneObj["mobile"] = pesronObj["mobile"];
    //      this.signature = pesronObj["signature"];
    // }else if(this.message["Path"] === "bankCard"){
    //     this.debitObj["fullName"] =  pesronObj["fullName"];
    //     this.debitObj["identityNumber"] =  pesronObj["identityNumber"];
    //     this.debitObj["cardNumber"] = pesronObj["cardNumber"];
    //     this.debitObj["cardMobile"] = pesronObj["mobile"];
    //     this.signature = pesronObj["signature"];
    // }

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

  getcontent(authType, authData){

    let retContent = {};
    retContent["Path"] = 'kyc' +'/'+ authData["type"];
    retContent["Values"] =[];
    let proofObj = {
      signature : authData["resultSign"],
      notary : "COOIX"
    }
/////////////////

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

    console.info("ElastJs company getcontent retContent before push ");

    retContent["Values"].push(valueObj)
    console.info("ElastJs company getcontent retContent "+ JSON.stringify(retContent));
    return retContent;
    ////////////////
    // retContent["Proof"] = JSON.stringify(proofObj);
    //
    // console.info("getcontent Proof "+ retContent["Proof"]);
    //
    // let kycContent = this.getKycContent(authData);
    //
    // console.info("getcontent kycContent "+ JSON.stringify(kycContent));
    //
    // let authDataHash = IDManager.hash(JSON.stringify(kycContent)+retContent["Proof"]);
    // retContent["DataHash"] = IDManager.hash(authDataHash+retContent["Proof"]);
    //
    // console.info("getcontent retContent "+ JSON.stringify(retContent));

    //return retContent;
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
      content = this.getcontent(params.type , ele);
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




  sendRawTransaction( rawTransaction){
    //alert("sendRawTransaction begin==");

    // this.walletManager.sendRawTransaction(this.masterWalletId,"IdChain",rawTransaction,this.fee,this.passworld,(result)=>{


    //   let rawTransactionObj = JSON.parse(rawTransaction);

    //   console.log("ElastosJs person-write-chain.ts ---sendRawTransaction---"+"rawTransaction="+JSON.stringify(rawTransactionObj)+"fee="+this.fee);
    //   //console.log("ElastosJs ---sendRawTransaction--- PayLoad"+ JSON.stringify(rawTransactionObj.PayLoad));

    //   if (!rawTransactionObj.PayLoad) {
    //     console.log("ElastosJs ---sendRawTransaction--- PayLoad NULL");
    //     return;
    //   }

    //   if (!rawTransactionObj["PayLoad"]["Contents"]){
    //     console.log("ElastosJs ---sendRawTransaction--- Contents NULL");
    //     return ;
    //   }

    //   for (let ele of rawTransactionObj["PayLoad"]["Contents"] ) {

    //     console.log("ElastosJs person-write-chain.ts ---sendRawTransaction--- ele " + JSON.stringify(ele));
    //     let arr = ele["Path"].split("/");

    //     if (arr[1]) {


    //       let self = this;
    //       //iterat values
    //       for (let valueObj of ele["Values"]){
    //         let proofObj = JSON.parse(valueObj["Proof"]);

    //         this.localStorage.getSeqNumObj(proofObj["signature"], rawTransactionObj.PayLoad.Id, arr[1], function (reult : any) {
    //           console.info("ElastosJs reult " + JSON.stringify(reult) );
    //           self.dataManager.addSeqNumObj(proofObj["signature"] , reult );

    //         });
    //       }
    //       // let proofObj = JSON.parse(ele["Proof"]);
    //       // let self = this;
    //       //
    //       // this.localStorage.getSeqNumObj(proofObj["signature"], rawTransactionObj.PayLoad.Id, arr[1], function (reult : any) {
    //       //   console.info("ElastosJs reult" + JSON.stringify(reult) );
    //       //   self.dataManager.addSeqNumObj(proofObj["signature"] , reult );
    //       //
    //       // });


    //     }
    //   }

    //   console.info("sendRawTransaction person-write-chain.ts setOrderStatus(4)")
    //   this.setOrderStatus(4);
    //   //this.messageBox("text-id-kyc-china");
    // })
  }


getPageObj(obj){
  let aprObj ={};

for(let index in obj){
 let data = obj[index];
 let retdata= data["retdata"];
 if(data["type"] === "identityCard"){
   aprObj["identityCard"] = {"identityNumber":retdata["identityNumber"],"fullName":retdata["fullName"]}
 }else if(data["type"] === "phone"){
   aprObj["phone"] = {"mobile":retdata["mobile"]};
 }else if(data["type"] === "bankCard"){
   aprObj["bankCard"] = {"cardMobile":retdata["mobile"],"cardNumber":retdata["cardNumber"]};
 }
}
 return aprObj;
}


// setOrderStatus(){
//   let serids = Config.getSerIds();
//   let serid = serids[this.serialNum];
//   let did = serid["id"];
//   let appName = serid["appName"];
//   let appr = serid["appr"];
//   let idsObj = {};
//   this.localStorage.getKycList("kycId").then((val)=>{
//       if(val == null || val === undefined || val === {} || val === ''){
//            return;
//       }
//    idsObj = JSON.parse(val);
//    idsObj[did][appName][appr]["order"][this.serialNum]["status"] = 2;
//    this.localStorage.set("kycId",idsObj).then(()=>{
//             this.orderStatus = 2;
//    });
//   });
// }
// }


setOrderStatus(status){
  console.info("ElastJs setOrderStatus status begin" + status);
  let serids = Config.getSerIds();
  console.info("ElastJs setOrderStatus status serids" + JSON.stringify(serids));

  let serid = serids[this.serialNum];
  let did = serid["id"];
  let path = serid["path"];
  let idsObj = {};
  this.localStorage.getKycList("kycId").then((val)=>{
      if(val == null || val === undefined || val === {} || val === ''){
        console.info("ElastJs setOrderStatus val == null return ");
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

