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

  createWallet(Fun) {
    this.wallet.createWallet([], () => {
      Fun();
    }, this.errorFun);
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
   * @param {number} type
   * @param {string} payPassword
   * @param {boolean} singleAddress
   */
  createSubWallet(type: number,chainID:string, coinTypeIndex: number, payPassword: string, singleAddress: boolean, feePerKb: number, Fun) {
    if (type == WalletManager.COINTYPE_ELA) {
      this.wallet.createSubWallet([type,chainID, coinTypeIndex, payPassword, singleAddress, feePerKb], Fun, this.errorFun);
    }
  }

  /***
   * 恢复子钱包
   * @param {number} type
   * @param {string} payPassword
   * @param {boolean} singleAddress
   */
  recoverSubWallet(type: number, payPassword: string, singleAddress: boolean, Fun) {
    if (type == WalletManager.COINTYPE_ELA) {
      this.wallet.recoverSubWallet([0, 0, payPassword, singleAddress, WalletManager.LIMITGAP, WalletManager.FEEPERKb], Fun, this.errorFun);
    }
  }

  /***
   * 获取子钱包公钥
   * @param Fun
   */
  getPubKey(Fun) {
    this.wallet.getPubKey([], Fun, this.errorFun);
  }


  //----------------------------------------------------------------------- 主钱包操作


  /**
   * 创建主钱包
   * @param {string} backupPassword
   * @param payPasswordm
   * @param Fun
   */
  createMasterWallet(backupPassword: string, payPassword, Fun) {
    this.wallet.createMasterWallet([backupPassword, payPassword], Fun, this.errorFun);
  }


  importWalletWithKeystore(keystorePath: string, backupPassword: string, payPassword, Fun) {
    this.wallet.impo([keystorePath, backupPassword, payPassword], Fun, this.errorFun);
  }

  importWalletWithMnemonic(mnemonic: string, backupPassword: string, payPassword, Fun) {
    this.wallet.createMasterWallet([mnemonic, backupPassword, payPassword], Fun, this.errorFun);
  }

  exportWalletWithKeystore(keystorePath, backupPassword: string, Fun) {
    this.wallet.createMasterWallet([keystorePath, backupPassword], Fun, this.errorFun);
  }

  exportWalletWithMnemonic(backupPassword: string, Fun) {
    this.wallet.createMasterWallet([backupPassword], Fun, this.errorFun);
  }

  getBalanceFun(Fun) {
    this.wallet.getBalance([], Fun, this.errorFun);
  }

  createAddress() {
    // this.wallet.createAddress([], Fun, this.errorFun);
    let tempAddr = Math.random();
    let result = {address: tempAddr};
    return result;
  }

  // getTheLastAddress(Fun) {
  //   this.wallet.getTheLastAddress([], Fun, this.errorFun);
  //
  // }

  // getAllAddress(start: number, Fun) {
  getAllAddress() {
    // this.wallet.getAllAddress([start, WalletManager.PAGECOUNT], Fun, this.errorFun);
    let allAddress = [{id: '', address: 'Exbwononlxnknwlnblnwb'},
        {id: '', address: 'Exbwononlxnknwlnblnwb'},
        {id: '', address: 'Exbwononlxnknwlnblnwb'}]
    return allAddress;
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

  errorFun(error) {
    Logger.info(error);
    //Native.toast(error);
  }


}


