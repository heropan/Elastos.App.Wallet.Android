import {Injectable} from '@angular/core';
import {Native} from "./Native";
import {Config} from "./Config";
import {PopupProvider} from "./popup";
import { Events } from 'ionic-angular';
declare var cordova: any;


/***
 * wallet jni 交互
 *
 * WalletManager.ts -> Wallet.js -> wallet.java -> WalletManager.java
 */
@Injectable()
export class WalletManager {

  private wallet;
  public static COINTYPE_ELA = 0;
  public static COINTYPE_ID = 1;
  public static LIMITGAP = 500;
  public static FEEPERKb = 500;
  public static PAGECOUNT = 20;

  constructor(public native: Native,public event: Events,public popupProvider :PopupProvider) {
          this.wallet = cordova.plugins.Wallet;
          //this.wallet = {};
  }

  //--------------------------------------------------------------------------------子钱包操作


  /***
   * 创建子钱包
   * @param {string} masterWalletId
   * @param {string} chainID
   * @param {long} feePerKb
   */
  createSubWallet(masterWalletId:string,chainID:string,feePerKb: number, Fun) {
      this.wallet.createSubWallet([masterWalletId,chainID,feePerKb], Fun,(error)=>{
        this.errorFun(error);
      });
  }

  /***
   * 恢复子钱包
   * @param {string} masterWalletId
   * @param {string} chainID
   * @param {int} limitGap
   * @param {long} feePerKb
   */
  recoverSubWallet(masterWalletId:string,chainID:string,limitGap: number,feePerKb: number, Fun) {
      this.wallet.recoverSubWallet([masterWalletId,chainID,limitGap,feePerKb], Fun,(error)=>{
        this.errorFun(error);
      });
  }


  //----------------------------------------------------------------------- 主钱包操作

  /**
   * 创建主钱包
   * @param {string} masterWalletId
   * @param {string} mnemonic
   * @param {string} phrasePassword
   * @param {string} payPassword
   * @param {boolean} singleAddress
   * @param {string} language
   * @param Fun
   */
  createMasterWallet(masterWalletId: string,mnemonic:string,phrasePassword:string,payPassword:string,singleAddress:boolean,language:string, Fun) {
    this.wallet.createMasterWallet([masterWalletId,mnemonic,phrasePassword,payPassword,singleAddress,language], Fun,(error)=>{
      this.errorFun(error);
    });
  }
  /**
   * @param {string} masterWalletId
   * @param {string} keystoreContent
   * @param {string} backupPassword
   * @param {string} payPassword
   * @param Fun
   */
  importWalletWithKeystore(masterWalletId:string,keystoreContent: string, backupPassword: string, payPassword: string,Fun) {
    this.wallet.importWalletWithKeystore([masterWalletId,keystoreContent, backupPassword, payPassword], Fun,(error)=>{
      this.errorFun(error);
    });
  }

    /**
   * @param {string} masterWalletId
   * @param {string} mnemonic
   * @param {string} phrasePassword
   * @param {string} payPassword
   * @param {string} singleAddress
   * @param {string} language
   * @param Fun
   */
  importWalletWithMnemonic(masterWalletId:string,mnemonic: string, phrasePassword: string, payPassword,singleAddress:boolean,language:string, Fun) {
    this.wallet.importWalletWithMnemonic([masterWalletId,mnemonic,phrasePassword, payPassword,singleAddress,language], Fun,(error)=>{
      this.errorFun(error);
    });
  }

  /**
   * @param {string} masterWalletId
   * @param {string} backupPassWord
   * @param {string} payPassword
   * @param Fun
   */
  exportWalletWithKeystore(masterWalletId:string,backupPassWord:string, payPassword: string,Fun) {
    this.wallet.exportWalletWithKeystore([masterWalletId,backupPassWord,payPassword], Fun,(error)=>{
      this.errorFun(error);
    });
  }
  /**
   * @param {string} masterWalletId
   * @param {string} backupPassWord
   * @param Fun
   */
  exportWalletWithMnemonic(masterWalletId:string,backupPassWord: string, Fun) {
    this.wallet.exportWalletWithMnemonic([masterWalletId,backupPassWord], Fun,(error)=>{
      this.errorFun(error);
    });
  }
   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param Fun
   */
  getBalance(masterWalletId:string,chainId:string,Fun) {
    this.wallet.getBalance([masterWalletId,chainId], Fun,(error)=>{
      this.errorFun(error);
    });
  }
   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param Fun
   */
  createAddress(masterWalletId:string,chainId:string,Fun) {
       this.wallet.createAddress([masterWalletId,chainId], Fun,(error)=>{
        this.errorFun(error);
      });
  }

  /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} start
   * @param Fun
   */
  getAllAddress(masterWalletId:string,chainId:string,start:number,Fun) {
    this.wallet.getAllAddress([masterWalletId,chainId,start,20], Fun ,(error)=>{
      this.errorFun(error);
    });
  }

   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} address
   * @param Fun
   */
  getBalanceWithAddress(masterWalletId:string,chainId:string,address:string, Fun) {
    this.wallet.getBalanceWithAddress([masterWalletId,chainId,address], Fun,(error)=>{
      this.errorFun(error);
    });
  }

  createMultiSignTransaction(masterWalletId:string,chainId:string,fromAddress:string,toAddress:string,amount,memo:string,Fun){
    this.wallet.createMultiSignTransaction([masterWalletId,chainId,fromAddress,toAddress,amount,memo],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} start
   * @param {string} addressOrTxId
   * @param Fun
   */
  getAllTransaction(masterWalletId:string,chainId:string,start,addressOrTxId, Fun) {
    this.wallet.getAllTransaction([masterWalletId,chainId,start, WalletManager.PAGECOUNT, addressOrTxId], Fun,(error)=>{
      this.errorFun(error);
    });
  }
   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param Fun
   */
  registerWalletListener(masterWalletId:string,chainId:string,Fun) {
    this.wallet.registerWalletListener([masterWalletId,chainId], Fun,(error)=>{
      this.errorFun(error);
    });
  }

  registerIdListener(chainId:string,Fun) {
    this.wallet.registerIdListener([chainId], Fun,(error)=>{
      this.errorFun(error);
    });
  }
  /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} message
   * @param {string} payPassword
   * @param Fun
   */
  sign(masterWalletId:string,chainId:string,message, payPassword, Fun) {
    this.wallet.sign([masterWalletId,chainId,message, payPassword], Fun,(error)=>{
      this.errorFun(error);
    });
  }
   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} publicKey
   * @param {} message
   * @param {} signature
   * @param Fun
   */
  checkSign(masterWalletId:string,chainId:string,publicKey, message, signature, Fun) {
    this.wallet.checkSign([masterWalletId,chainId,publicKey, message, signature], Fun,(error)=>{
      this.errorFun(error);
    });
  }
  /**
   * @param {string} masterWalletId
   */
  destroyWallet(masterWalletId:string,Fun) {
    this.wallet.destroyWallet([masterWalletId], Fun,(error)=>{
      this.errorFun(error);
    });
  }

  deriveIdAndKeyForPurpose(purpose:number,index:number,payPassword:string,Fun){
    this.wallet.deriveIdAndKeyForPurpose([purpose,index,payPassword], Fun,(error)=>{
      this.errorFun(error);
    });
  }

  getAllMasterWallets(Fun){
    this.wallet.getAllMasterWallets([], Fun,(error)=>{
      this.errorFun(error);
    });
  }
   /**
   * @param {string} masterWalletId
   */
  getBalanceInfo(masterWalletId:string,chainId:string,Fun){
    this.wallet.getBalanceInfo([masterWalletId,chainId], Fun,(error)=>{
      this.errorFun(error);
    });
  }
  /**
   * @param {string} masterWalletId
   */
  isAddressValid(masterWalletId:string,address:string,Fun){
      this.wallet.isAddressValid([masterWalletId,address],Fun,(error)=>{
        this.errorFun(error);
      });
  }

  generateMnemonic(language:string,Fun){
    this.wallet.generateMnemonic([language],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  saveConfigs(Fun){
    this.wallet.saveConfigs([],Fun,(error)=>{
      this.errorFun(error);
    });
  }


  getAllChainIds(Fun){
    this.wallet.getAllChainIds([],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  /**
   * @param {string} masterWalletId
   */
  getSupportedChains(masterWalletId:string,Fun){
    this.wallet.getSupportedChains([masterWalletId],Fun,(error)=>{
      this.errorFun(error);
    });
  }
  /**
   * @param {string} masterWalletId
   */
  getAllSubWallets(masterWalletId:string,Fun){
    this.wallet.getAllSubWallets([masterWalletId],Fun,(error)=>{
      this.errorFun(error);
    });
  }
  /**
   * @param {string} masterWalletId
   */
  changePassword(masterWalletId:string,oldPassword:string , newPassword:string ,Fun){
     this.wallet.changePassword([masterWalletId,oldPassword,newPassword],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  createTransaction(masterWalletId:string,chainId:string,fromAddress:string , toAddress:string ,amount:number, memo:string, remark: string,Fun){
    this.wallet.createTransaction([masterWalletId,chainId,fromAddress,toAddress,amount,memo, remark],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  calculateTransactionFee(masterWalletId:string,chainId:string,rawTransaction:string,feePerKb:number,Fun){
    this.wallet.calculateTransactionFee([masterWalletId,chainId,rawTransaction,feePerKb],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  createDID(password:string,Fun){
    this.wallet.createDID([password],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  getDIDList(Fun){
    this.wallet.getDIDList([],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  destoryDID(did:string,Fun){
    this.wallet.destoryDID([did],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  didSetValue(did:string,keyPath:string,value:string,Fun){
    this.wallet.didSetValue([did,keyPath,value],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  didGetValue(did:string,keyPath:string,Fun){
    this.wallet.didGetValue([did,keyPath],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  didGetHistoryValue(did:string,keyPath:string,Fun){
    this.wallet.didGetValue([did,keyPath],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  didGetAllKeys(did:string,start:number,count:number,Fun){
    this.wallet.didGetAllKeys([did,start,count],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  didSign(did:string,message:string,password:string,Fun){
    this.wallet.didSign([did,message,password],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  didCheckSign(did:string,message:string,signature:string,Fun){
    this.wallet.didCheckSign([did,message,signature],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  didGetPublicKey(did:string,Fun){
    this.wallet.didGetPublicKey([did],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  createIdTransaction(masterWalletId:string,chainId:string,fromAddress:string,payloadJson:string,programJson:string,memo:string,remark:string,Fun){
     this.wallet.createIdTransaction([masterWalletId,chainId,fromAddress,payloadJson,programJson,memo,remark],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  createDepositTransaction(masterWalletId:string,chainId:string,fromAddress:string,toAddress:string,amount:number
                           ,sidechainAccounts:string,sidechainAmounts:string,sidechainIndex:string,memo:string,remark:string,Fun){
    this.wallet.createDepositTransaction([masterWalletId,chainId,fromAddress,toAddress,amount,sidechainAccounts,sidechainAmounts,sidechainIndex,memo,remark],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  createWithdrawTransaction(masterWalletId:string,chainId:string,fromAddress:string,toAddress:string,amount:number
                           ,mainchainAccounts:string,mainchainAmounts:string,mainchainIndexs:string,memo:string,remark:string,Fun){
    this.wallet.createWithdrawTransaction([masterWalletId,chainId,fromAddress,toAddress,amount,mainchainAccounts,mainchainAmounts,mainchainIndexs,memo,remark],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  getGenesisAddress(masterWalletId:string,chainId:string,Fun){
    this.wallet.getGenesisAddress([masterWalletId,chainId],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  didGenerateProgram(did:string,message:string,password:string,Fun){
      this.wallet.didGenerateProgram([did,message,password],Fun,(error)=>{
        this.errorFun(error);
      });
  }

 /**
   * @param {string} masterWalletId
   */
  getMasterWalletBasicInfo(masterWalletId:string,Fun){
     this.wallet.getMasterWalletBasicInfo([masterWalletId],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  createMultiSignMasterWallet(masterWalletId:string,coSigners:string,requiredSignCount:number,Fun){
                   this.wallet.createMultiSignMasterWallet([masterWalletId,coSigners,requiredSignCount],Fun,(error)=>{
                    this.errorFun(error);
                  });
  }

  createMultiSignMasterWalletWithPrivKey(masterWalletId:string,privKey:string,payPassword:string,coSigners:string,requiredSignCount:number,Fun){
      this.wallet.createMultiSignMasterWalletWithPrivKey([masterWalletId,privKey,payPassword,coSigners,requiredSignCount],Fun,(error)=>{
        this.errorFun(error);
      });
  }

  updateTransactionFee(masterWalletId:string,chainId:string,rawTransaction:string,fee:number,Fun){
      this.wallet.updateTransactionFee([masterWalletId,chainId,rawTransaction,fee],Fun,(error)=>{
        this.errorFun(error);
      });
  }

  signTransaction(masterWalletId:string,chainId:string,rawTransaction:string,payPassword:string,Fun){
    this.wallet.signTransaction([masterWalletId,chainId,rawTransaction,payPassword],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  publishTransaction(masterWalletId:string,chainId:string,rawTransaction:string,Fun){
    this.wallet.publishTransaction([masterWalletId,chainId,rawTransaction],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  getMasterWalletPublicKey(masterWalletId:string,Fun){
    this.wallet.getMasterWalletPublicKey([masterWalletId],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  getSubWalletPublicKey(masterWalletId:string,chainId:string,Fun){
    this.wallet.getSubWalletPublicKey([masterWalletId,chainId],Fun,(error)=>{
      this.errorFun(error);
    });
  }

  createMultiSignMasterWalletWithMnemonic(masterWalletId:string,mnemonic:string,phrasePassword:string,payPassword:string,coSignersJson:string,requiredSignCount:string,language:string,Fun){
     this.wallet.createMultiSignMasterWalletWithMnemonic([masterWalletId,mnemonic,phrasePassword,payPassword,coSignersJson,requiredSignCount,language],Fun,(error)=>{
      this.errorFun(error);
    });
  }
  //String txJson
  encodeTransactionToString(txJson:string,Fun){
    this.wallet.encodeTransactionToString([txJson],Fun,(error)=>{
      this.errorFun(error);
    });
  }

   //String txHexString
   decodeTransactionFromString(txHexString:string,Fun){
    this.wallet.decodeTransactionFromString([txHexString],Fun,(error)=>{
      this.errorFun(error);
    });
   }

   removeWalletListener(masterWalletId:string,chainId:string,Fun){
     this.wallet.removeWalletListener([masterWalletId,chainId],Fun,(error)=>{
      this.errorFun(error);
    });
   }

  errorFun(error) {
    console.log("error = "+JSON.stringify(error));
    let key = error["error"]["code"];
    if(key){
      key = "error-"+key;
    }
    this.native.hideLoading();
    if(error["error"]["code"] === 20013){
      let amount = error["error"]["Data"]/Config.SELA;
      this.popupProvider.ionicAlert_data('confirmTitle',key,amount);
    }else{
      this.popupProvider.ionicAlert('confirmTitle',key);
    }
    //alert("错误信息：" + JSON.stringify(error));
    this.event.publish("error:update");
  }


}


