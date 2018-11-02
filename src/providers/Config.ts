import {Injectable} from '@angular/core';
import {Logger} from "../providers/Logger";




/***
 * 封装配置信息
 */
@Injectable()
export class Config {
  public static masterWallObj={id:"",wallname:""};
  public static perObj = {};
  public static masterWalletId:string = "1";
  public static masterWalletList = [];

  public static mappingList = {};

  public static SELA = 100000000;

//  public static BLOCKCHAIN_URL: String = 'https://blockchain.elastos.org/';
    public static BLOCKCHAIN_URL: String = 'https://blockchain-beta.elastos.org/';

  private static kycObj:any={};

  private static deviceID:string="";

  private static serIds:any ={};

  private static walletResregister:any ={};

  public static getKycObj(){
       return this.kycObj;
  }

  public static setKycObj(obj){
        this.kycObj = obj;
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


  public static getCurMasterWalletId(){
            Logger.info("===getCurMasterWalletId===="+this.masterWalletId);
            return this.masterWalletId;
  }

  public static setCurMasterWalletId(masterWalletId){
       console.log("===setCurMasterWalletId===="+masterWalletId);
       this.masterWalletId = masterWalletId;
  }

  public static getMasterWalletIdList(){
          return this.masterWalletList;
  }

  public static setMasterWalletIdList(masterWalletList){
          this.masterWalletList = masterWalletList;
  }



  public static uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
     // Compact form
     for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
     // rfc4122, version 4 form
     var r;

     // rfc4122 requires these characters
     uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
     uuid[14] = '4';

     // Fill in random data. At i==19 set the high bits of clock sequence as
     // per rfc4122, sec. 4.1.5
     for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
       r = 0 | Math.random()*16;
       uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
     }
    }

    return uuid.join('');
  }


  public static setMasterPer(masterId,coin,per){
      if(this.perObj[masterId]){
        this.perObj[masterId][coin] = per;
      }else{
         this.perObj[masterId] = {};
         this.perObj[masterId][coin] = per;
      }
  }

  public static getMasterPer(masterId,coin){

    if(this.perObj[masterId]){
      return this.perObj[masterId][coin] || 0;
    }else{
         return 0;
    }
  }

  public static setMappingList(list){
      this.mappingList = list;
  }

  public static getMappingList(){
       return this.mappingList;
  }

  public static objtoarr(obj){
    let arr = [];
    for (let key in obj) {
      arr.push(obj[key]);
    }
    return arr;
  }

  public static getWalletName(id){
          return this.mappingList[id]["wallname"] || "";
  }

  public static setWalletName(id,walletname){
    this.mappingList[id]["wallname"] = walletname;
  }

  public static getSubWallet(id){
          return this.mappingList[id]["coinListCache"] || null;
  }

  public static isResregister(id,coin){
          if(this.walletResregister[id]){
              if(this.walletResregister[id][coin]){
                return this.walletResregister[id][coin];
              }else{
                return false;
              }

          }else{
                return false;
          }
  }

  public static setResregister(id,coin,isOpen){
        if(this.walletResregister[id]){
          this.walletResregister[id][coin] = isOpen;
        }else{
          this.walletResregister[id] = {};
          this.walletResregister[id][coin] = isOpen;
        }

  }

 public static getAccountType(masterWalletId){
  return this.mappingList[masterWalletId]["Account"] || {};
 }
}


