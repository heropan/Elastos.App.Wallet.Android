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

  public static appList=[{"id":0,"appkeyName":"KYC"}];

  //短信接口签名私钥
  private static smsSecretKey = "";

  public static test: any = '';

  private static kycObj:any={};

  public static getKycObj(){
       return this.kycObj;
  }

  public static setKycObj(obj){
        this.kycObj = obj;
  }

  public static getPersonObj(){
       return {
       'id':"",
       'createType':1,
       'status':'0',
       'mnemonic':"zzzzzzz",//助记词
       'priKey':"",
       'backupPassword':"",
       'payPassword':"",
       'maxNumber':3,
       'pubKey':'sdfghhjjkkj',
       'updateTiem':'2018-05-20',
       'finshNumber':0,
       'validateType':[]
      };
  }


  public static getCompanyObj(){
    return {
    'id':"",
    'createType':2,
    'mnemonic':"zzzzzzz",//助记词
    'status':'0',
    'priKey':"",
    'backupPassword':"",
    'payPassword':"",
    'maxNumber':1,
    'pubKey':'sdfghhjjkkj',
    'updateTiem':'2018-05-20',
    'finshNumber':0,
    'validateType':[]
   };
  }

  public static getSmsSecretKey(){
      return this.smsSecretKey;
  }
}


