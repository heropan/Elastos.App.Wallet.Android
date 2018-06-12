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

    // this.wallet.test2(["123"], function () {
    //   alert("成功啦");
    // }, function () {
    //   alert("失败啦");
    // })
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
  getPubKey(Fun) {
    this.wallet.getPublicKey([], Fun, this.errorFun);
  }


  //----------------------------------------------------------------------- 主钱包操作


  /**
   * 创建主钱包
   * @param {string} phrasePassword
   * @param {string} payPassword
   * @param {string} language
   * @param Fun
   */
  createMasterWallet(masterWalletId: string,phrasePassword: string, payPassword:string,language:string, Fun) {
    this.wallet.createMasterWallet([masterWalletId, phrasePassword, payPassword,language], Fun, this.errorFun);
    //return {};
  }

  importWalletWithKeystore(keystorePath: string, backupPassword: string, payPassword, Fun) {
    this.wallet.importWalletWithKeystore([keystorePath, backupPassword, payPassword], Fun, this.errorFun);
  }

  importWalletWithMnemonic(mnemonic: string, backupPassword: string, payPassword,language:string, Fun) {
    this.wallet.createMasterWallet([mnemonic, backupPassword, payPassword,language], Fun, this.errorFun);
  }

  exportWalletWithKeystore(keystorePath, backupPassword: string, Fun) {
    this.wallet.createMasterWallet([keystorePath, backupPassword], Fun, this.errorFun);
  }

  exportWalletWithMnemonic(payPassword: string, Fun) {
    this.wallet.exportWalletWithMnemonic([payPassword], Fun, this.errorFun);
  }

  getBalanceFun(Fun) {
    this.wallet.getBalance([], Fun, this.errorFun);
  }

  createAddress(Fun) {
       this.wallet.createAddress([], Fun, this.errorFun);
    // let tempAddr = Math.random();
    // let result = {address: tempAddr};
    // return result;
  }

  // getTheLastAddress(Fun) {
  //   this.wallet.getTheLastAddress([], Fun, this.errorFun);
  //
  // }

  // getAllAddress(start: number, Fun) {
  getAllAddress(start:number,Fun) {
    this.wallet.getAllAddress([start, WalletManager.PAGECOUNT], Fun, this.errorFun);
    // let allAddress = [{id: '', address: 'Exbwononlxnknwlnblnwb'},
    //     {id: '', address: 'Exbwononlxnknwlnblnwb'},
    //     {id: '', address: 'Exbwononlxnknwlnblnwb'}]
    // return allAddress;
  }

  getBalanceWithAddress(address, Fun) {
    this.wallet.getBalanceWithAddress([address], Fun, this.errorFun);
  }

  sendTransaction(fromAddress, toAddress, amount, fee, payPassword, memo, Fun) {
    this.wallet.sendTransaction([fromAddress, toAddress, amount, fee, payPassword, memo], Fun, this.errorFun);
  }

  generateMultiSignTransaction(fromAddress, toAddress, amount, fee, payPassword, memo, Fun) {
    this.wallet.generateMultiSignTransaction([fromAddress, toAddress, amount, fee, payPassword, memo], Fun, this.errorFun);
  }

  createMultiSignAddress(multiPublicKeyJson, totalSignNum, requiredSignNum, Fun) {
    this.wallet.createMultiSignAddress([multiPublicKeyJson, totalSignNum, requiredSignNum], Fun, this.errorFun);
  }

  getAllTransaction(start, addressOrTxId, Fun) {
    this.wallet.getAllTransaction([start, WalletManager.PAGECOUNT, addressOrTxId], Fun, this.errorFun);
  }

  addWalletListener(Fun) {
    this.wallet.addCallback([], Fun, this.errorFun);
  }


  sign(message, payPassword, Fun) {
    this.wallet.sign([message, payPassword], Fun, this.errorFun);
  }

  checkSign(address, message, signature, payPassword, Fun) {
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

  errorFun(error) {
    Logger.info(error);
    //Native.toast(error);
  }


}


