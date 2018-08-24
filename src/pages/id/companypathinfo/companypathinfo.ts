import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {IdKycCompanyComponent} from "../../../pages/id/kyc/company/company";
import {IDManager} from "../../../providers/IDManager";
import {ApiUrl} from "../../../providers/ApiUrl";
import {CompanyWriteChainPage} from "../../../pages/id/kyc/company-write-chain/company-write-chain";

@Component({
  selector: 'page-companypathinfo',
  templateUrl: 'companypathinfo.html',
})
export class CompanypathinfoPage extends BaseComponent implements OnInit{
       public companyPathList = [];
       private parmar ={};
       public idsObj ={};
       ngOnInit(){
        this.parmar = this.getNavParams().data;
        console.log("---path---"+JSON.stringify(this.parmar));
        this.setTitleByAssets("text-company-path-deatils");
        this.localStorage.get("kycId").then((val)=>{
          if(val == null || val === undefined || val === {} || val === ''){
            return;
           }
          this.idsObj = JSON.parse(val);

          let pathList = this.idsObj[this.parmar["id"]][this.parmar["path"]];

          for(let key in pathList){
             this.companyPathList.push(pathList[key]);
          }


        });
       }

      onNext(item){
          this.jumpPage(item);
      }

      onCommit(){
          this.Go(IdKycCompanyComponent,this.parmar);
      }

      jumpPage(item){
          switch(item["pathStatus"]){
                case 0 :
                    break;
                case 1:
                   this.getAppAuth(item);
                    break;
                case 2 :
                   this.Go(CompanyWriteChainPage,item);
                    break;
          }
      }

/*  authResult[data] 格式
  [{
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
    "timestamp": "1535090608902",
    "resultSign": "304402204187f00b8217b9eaeaad4c7c25ab01479872467443c7a516c68b368d290767ea02205f4130cd5bb904a070978baf2141ecaafb72163b45c21dc64fc48d63ad3ab0c4"
  }]
  */
      getAppAuth(item){
        let serialNum = item["serialNum"];
        let txHash =  item["txHash"];
        console.log("getAppAuth======= txHash type "+typeof(txHash));
        console.log('ElastosJs companypathinfo.ts----getAppAuth----'+"---serialNum---"+serialNum+"---txHash---"+txHash);
        let timestamp = this.getTimestamp();
        let parms ={"serialNum":serialNum,
                    "txHash":txHash,
                    "timestamp":timestamp,
                   }
        let checksum = IDManager.getCheckSum(parms,"asc");
        parms["checksum"] = checksum;
        this.getHttp().postByAuth(ApiUrl.APP_AUTH,parms).toPromise().then().then(data => {
          if(data["status"] === 200){
            console.log("ElastosJs companypathinfo.ts data ======="+JSON.stringify(data));
            let authResult = JSON.parse(data["_body"]);

            console.log("ElastosJs companypathinfo.ts authResult ======="+JSON.stringify(authResult));

            if(authResult["errorCode"] === "1"){
              this.messageBox("text-id-kyc-auth-fee-fail");
              return;
            }
            if(authResult["errorCode"] === "2"){
                     this.messageBox("text-id-kyc-auth-query-timeout");
                     return;
            }
            if(authResult["errorCode"] === "4"){
                this.messageBox("text-id-kyc-auth-uncompleted");
                   return;
            }
            if(authResult["errorCode"] === "0"){
                //this.params["adata"] = authResult["data"];
                item["adata"] = authResult["data"];
                this.saveSerialNumParm(serialNum,item);


              console.log("ElastosJs companypathinfo.ts length ======="+authResult["data"].length);

              if (authResult["data"].length > 0){
                var signCont = JSON.parse(JSON.stringify(authResult["data"][0]));
                 let resultSign = signCont["resultSign"];
                  delete signCont["resultSign"];

                  this.dataManager.addSignCont(resultSign, signCont);

              }
            }
           }
        }).catch(error => {

        });
      }

      saveSerialNumParm(serialNum,item){
         item["pathStatus"] = 2;
         this.idsObj[this.parmar["id"]][this.parmar["path"]][serialNum]= item;
         this.localStorage.set("kycId",this.idsObj).then(()=>{
            this.Go(CompanyWriteChainPage,item);
         });
      }
}
