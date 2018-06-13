import {Injectable} from '@angular/core';
import {Logger} from "./Logger";
//import {Native} from "./Native";
//import {StorageUtil} from "./StorageUtil";
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

  constructor() {
    this.wallet = cordova.plugins.Wallet;
    //this.wallet = {};
  }

  /**通过android log 打印数据*/
  print(text: string, Fun): void {
    this.wallet.print(text, Fun, this.errorFun);
  }

  start() {
    this.wallet.start([], () => {
    }, this.errorFun);
  }

  stop() {
    this.wallet.start([], () => {
    }, this.errorFun);
  }


  //--------------------------------------------------------------------------------子钱包操作


  /***
   * 创建子钱包
   * @param {String} chainID
   * @param {string} payPassword
   * @param {boolean} singleAddress
   * @param {long} feePerKb
   */
  createSubWallet(chainID:string,payPassword: string, singleAddress: boolean, feePerKb: number, Fun) {
      this.wallet.createSubWallet([chainID,payPassword, singleAddress,feePerKb], Fun, this.errorFun);
  }

  /***
   * 恢复子钱包
   * @param {string} chainID
   * @param {string} payPassword
   * @param {boolean} singleAddress
   * @param {int} limitGap
   * @param {long} limitGap
   */
  recoverSubWallet(chainID:string,payPassword: string, singleAddress: boolean,limitGap: number,feePerKb: number, Fun) {
      this.wallet.recoverSubWallet([chainID,payPassword,singleAddress,limitGap,feePerKb], Fun, this.errorFun);
  }

  /***
   * 获取子钱包公钥
   * @param Fun
   */
  getPublicKey(Fun) {
    this.wallet.getPublicKey([], Fun, this.errorFun);
  }


  //----------------------------------------------------------------------- 主钱包操作


  /**
   * 创建主钱包
   * @param {string} masterWalletId
   * @param {string} phrasePassword
   * @param {string} payPassword
   * @param {string} language
   * @param Fun
   */
  createMasterWallet(masterWalletId: string,phrasePassword: string, payPassword:string,language:string, Fun) {
    this.wallet.createMasterWallet([masterWalletId, phrasePassword, payPassword,language], Fun, this.errorFun);
  }
  /**
   * @param {string} masterWalletId
   * @param {string} keystorePath
   * @param {string} backupPassword
   * @param {string} payPassword
   * @param {string} phrasePassword
   * @param Fun
   */
  importWalletWithKeystore(masterWalletId:string,keystorePath: string, backupPassword: string, payPassword: string,phrasePassword:string, Fun) {
    this.wallet.importWalletWithKeystore([masterWalletId,keystorePath, backupPassword, payPassword,phrasePassword], Fun, this.errorFun);
  }

    /**
   * @param {string} masterWalletId
   * @param {string} mnemonic
   * @param {string} phrasePassword
   * @param {string} payPassword
   * @param {string} language
   * @param Fun
   */
  importWalletWithMnemonic(masterWalletId:string,mnemonic: string, phrasePassword: string, payPassword,language:string, Fun) {
    this.wallet.createMasterWallet([masterWalletId,mnemonic,phrasePassword, payPassword,language], Fun, this.errorFun);
  }

  /**
   * @param {string} backupPassWord
   * @param {string} payPassword
   * @param {string} keystorePath
   * @param Fun
   */
  exportWalletWithKeystore(backupPassWord:string, payPassword: string,  keystorePath: string,Fun) {
    this.wallet.createMasterWallet([backupPassWord,payPassword,keystorePath,], Fun, this.errorFun);
  }
  /**
   * @param {string} backupPassWord
   * @param Fun
   */
  exportWalletWithMnemonic(backupPassWord: string, Fun) {
    this.wallet.exportWalletWithMnemonic([backupPassWord], Fun, this.errorFun);
  }

  getBalance(chainId:string,Fun) {
    this.wallet.getBalance([chainId], Fun, this.errorFun);
  }

  createAddress(chainId:string,Fun) {
       this.wallet.createAddress([chainId], Fun, this.errorFun);
    // let tempAddr = Math.random();
    // let result = {address: tempAddr};
    // return result;
  }

  // getTheLastAddress(Fun) {
  //   this.wallet.getTheLastAddress([], Fun, this.errorFun);
  //
  // }

  // getAllAddress(start: number, Fun) {
  getAllAddress(chainId:string,start:number,Fun) {
    this.wallet.getAllAddress([start, WalletManager.PAGECOUNT], Fun, this.errorFun);
    // let allAddress = [{id: '', address: 'Exbwononlxnknwlnblnwb'},
    //     {id: '', address: 'Exbwononlxnknwlnblnwb'},
    //     {id: '', address: 'Exbwononlxnknwlnblnwb'}]
    // return allAddress;
  }

  getBalanceWithAddress(chainId:string,address, Fun) {
    this.wallet.getBalanceWithAddress([address], Fun, this.errorFun);
  }

  sendTransaction(chainId:string,fromAddress, toAddress, amount, fee, payPassword, memo, Fun) {
    this.wallet.sendTransaction([fromAddress, toAddress, amount, fee, payPassword, memo], Fun, this.errorFun);
  }

  generateMultiSignTransaction(chainId:string,fromAddress, toAddress, amount, fee, payPassword, memo, Fun) {
    this.wallet.generateMultiSignTransaction([fromAddress, toAddress, amount, fee, payPassword, memo], Fun, this.errorFun);
  }

  createMultiSignAddress(chainId:string,multiPublicKeyJson, totalSignNum, requiredSignNum, Fun) {
    this.wallet.createMultiSignAddress([multiPublicKeyJson, totalSignNum, requiredSignNum], Fun, this.errorFun);
  }

  getAllTransaction(chainId:string,start, addressOrTxId, Fun) {
    this.wallet.getAllTransaction([start, WalletManager.PAGECOUNT, addressOrTxId], Fun, this.errorFun);
  }

  registerWalletListener(chainId:string,Fun) {
    this.wallet.addCallback([chainId], Fun, this.errorFun);
  }


  sign(chainId:string,message, payPassword, Fun) {
    this.wallet.sign([message, payPassword], Fun, this.errorFun);
  }

  checkSign(chainId:string,address, message, signature, payPassword, Fun) {
    this.wallet.checkSign([address, message, signature], Fun, this.errorFun);
  }

  destroyWallet(Fun) {
    this.wallet.destroyWallet([], Fun, this.errorFun);
  }


  getFee(Fun) {
    Fun(0.01);
  }

  deriveIdAndKeyForPurpose(purpose:number,index:number,payPassword:string,Fun){
    this.wallet.deriveIdAndKeyForPurpose([purpose,index,payPassword], Fun, this.errorFun);
  }

  getAllMasterWallets(Fun){
    this.wallet.getAllMasterWallets([], Fun, this.errorFun);
  }

  getBalanceInfo(chainId:string,Fun){
    this.wallet.getBalanceInfo([chainId], Fun, this.errorFun);
  }

  errorFun(error) {
    Logger.info(error);
    //Native.toast(error);
  }


}


