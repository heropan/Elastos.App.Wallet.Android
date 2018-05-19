import {Injectable} from '@angular/core';
import {Logger} from "./Logger";
import {Native} from "./Native";
import {StorageUtil} from "./StorageUtil";


declare var cordova: any;


/***
 * wallet jni 交互
 *
 * WalletManager.ts -> Wallet.js -> wallet.java -> WalletManager.java
 */
@Injectable()
export class WalletManager {

  private wallet;

  constructor() {
    this.wallet = cordova.plugins.Wallet;
    alert(this.wallet);

    // this.wallet.test2(["123"], function () {
    //   alert("成功啦");
    // }, function () {
    //   alert("失败啦");
    // })
  }

  /**通过android log 打印数据*/
  print(text:string,Fun): void {
    this.wallet.print(text,Fun,this.errorFun);
  }

  createWallet(Fun){
    this.wallet.createWallet([],() => {
      Fun();
    },this.errorFun);
  }


  start(){
    this.wallet.start([],()=>{},this.errorFun);
  }

  stop(){
    this.wallet.start([],()=>{},this.errorFun);
  }

  exportKey(path,Fun){
    this.wallet.export([path],Fun,this.errorFun);
  }

  importKey(path,Fun){
    this.wallet.importKey([path],Fun,this.errorFun);
  }

  importMnemonic(mnemonic,Fun){
    this.wallet.recoverWallet([mnemonic,Native.getLanguage()],Fun,this.errorFun);
  }

  createTransaction(address,amount,fee,remark,Fun){
    this.wallet.createTransaction([address,amount],Fun,this.errorFun);
  }

  getTransactions(Fun){
    this.wallet.getTransactions([],Fun,this.errorFun);
  }

  registerWalletListener(Fun){
    this.wallet.registerWalletListener([],Fun,this.errorFun);
  }

  getBalance(address,Fun){
    this.wallet.getBalance([address],Fun,this.errorFun);
  }

  createAddress(Fun){
    this.wallet.createAddress([],Fun,this.errorFun);
  }

  getAddressList(Fun){
    this.wallet.getAddressList([],Fun,this.errorFun);
  }

  sign(data,Fun){
    this.wallet.sign([data],Fun,this.errorFun);
  }



  getPubKey(Fun){
    this.wallet.getPubKey([],Fun,this.errorFun);
  }

  getAllBalance(Fun){

  }


  getMnemonic(Fun){
    this.wallet.getMnemonic([],(data)=>{
      Fun(data.mnemonic);
    },this.errorFun);
  }

  errorFun(error){
    Logger.info(error);
    Native.toast(error);
  }


}


