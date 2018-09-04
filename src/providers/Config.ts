import {Injectable} from '@angular/core';





/***
 * 封装配置信息
 */
@Injectable()
export class Config {

  public static COIN_LIST = {"ELA": {id: 0, name: 'ELA', balance: 0}};

  public static WalletKey = "wallet";

  public static LIST_COUNT = 20;

  public static SELA = 100000000;

  public static BLOCKCHAIN_URL: String = 'https://blockchain.elastos.org/';

  public static appList=[{"id":0,"appkeyName":"kyc"}];

  private static smsSecretKey = "";

  public static test: any = '';

  private static kycObj:any={};

  private static deviceID:string="";

  private static serIds:any ={};

  public static getKycObj(){
       return this.kycObj;
  }

  public static setKycObj(obj){
        this.kycObj = obj;
  }

  public static getSmsSecretKey(){
      return this.smsSecretKey;
  }

  public static setDeviceID(deviceID){
       this.deviceID = deviceID;
  }

  public static getdeviceID(){
        return this.deviceID;
  }

  public static getSerIds(){
         return this.serIds;
  }

  public static setSerIds(serIds){
        console.info("Elastjs setSerIds serIds " + JSON.stringify(serIds));
        this.serIds = serIds;
  }

 public static add(idObj,newIds,id,path){
  for(let index in idObj[id][path]){
   let data = idObj[id][path][index];
   newIds[index] ={"id":id,"path":path,"serialNum":data["serialNum"],"txHash":data["txHash"]};
  }
}

 public static getSertoId(ids){
  let newIds = {};
          for(let key in ids){
             let id =  key;
             let idObj = ids[id];
             let path = "enterprise";
               if(idObj[path]){
                 this.add(ids,newIds,id,path);
                }

             path = "identityCard";
               if(idObj[path]){
                 this.add(ids,newIds,id,path);
               }

                path = "phone";
               if(idObj[path]){
                 this.add(ids,newIds,id,path);

               }

               path = "bankCard";
               if(idObj[path]){
                 this.add(ids,newIds,id,path);

               }
          }

          return newIds;
  }
}


