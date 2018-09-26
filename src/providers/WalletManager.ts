import {Injectable} from '@angular/core';
import {Native} from "./Native";
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
  public static PAGECOUNT = 100;

  constructor(public native: Native) {
      this.wallet = cordova.plugins.Wallet;
      //this.wallet = {};
  }

  //--------------------------------------------------------------------------------子钱包操作


  /***
   * 创建子钱包
   * @param {string} masterWalletId
   * @param {string} chainID
   * @param {string} payPassword
   * @param {boolean} singleAddress
   * @param {long} feePerKb
   */
  createSubWallet(masterWalletId:string,chainID:string,payPassword: string, singleAddress: boolean, feePerKb: number, Fun) {
      this.wallet.createSubWallet([masterWalletId,chainID,payPassword, singleAddress,feePerKb], Fun, this.errorFun);
  }

  /***
   * 恢复子钱包
   * @param {string} masterWalletId
   * @param {string} chainID
   * @param {string} payPassword
   * @param {boolean} singleAddress
   * @param {int} limitGap
   * @param {long} feePerKb
   */
  recoverSubWallet(masterWalletId:string,chainID:string,payPassword: string, singleAddress: boolean,limitGap: number,feePerKb: number, Fun) {
      this.wallet.recoverSubWallet([masterWalletId,chainID,payPassword,singleAddress,limitGap,feePerKb], Fun, this.errorFun);
  }


  //----------------------------------------------------------------------- 主钱包操作

  /**
   * 创建主钱包
   * @param {string} masterWalletId
   * @param {string} language
   * @param Fun
   */
  createMasterWallet(masterWalletId: string,mnemonic:string,phrasePassword:string,payPassword:string,language:string, Fun) {
    this.wallet.createMasterWallet([masterWalletId,mnemonic,phrasePassword,payPassword,language], Fun, this.errorFun);
  }
  /**
   * @param {string} masterWalletId
   * @param {string} keystoreContent
   * @param {string} backupPassword
   * @param {string} payPassword
   * @param {string} phrasePassword
   * @param Fun
   */
  importWalletWithKeystore(masterWalletId:string,keystoreContent: string, backupPassword: string, payPassword: string,phrasePassword:string, Fun) {
    this.wallet.importWalletWithKeystore([masterWalletId,keystoreContent, backupPassword, payPassword,phrasePassword], Fun, this.errorFun);
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
    this.wallet.importWalletWithMnemonic([masterWalletId,mnemonic,phrasePassword, payPassword,language], Fun, this.errorFun);
  }

  /**
   * @param {string} masterWalletId
   * @param {string} backupPassWord
   * @param {string} payPassword
   * @param Fun
   */
  exportWalletWithKeystore(masterWalletId:string,backupPassWord:string, payPassword: string,Fun) {
    this.wallet.exportWalletWithKeystore([masterWalletId,backupPassWord,payPassword], Fun, this.errorFun);
  }
  /**
   * @param {string} masterWalletId
   * @param {string} backupPassWord
   * @param Fun
   */
  exportWalletWithMnemonic(masterWalletId:string,backupPassWord: string, Fun) {
    this.wallet.exportWalletWithMnemonic([masterWalletId,backupPassWord], Fun, this.errorFun);
  }
   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param Fun
   */
  getBalance(masterWalletId:string,chainId:string,Fun) {
    this.wallet.getBalance([masterWalletId,chainId], Fun, this.errorFun);
  }
   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param Fun
   */
  createAddress(masterWalletId:string,chainId:string,Fun) {
       this.wallet.createAddress([masterWalletId,chainId], Fun, this.errorFun);
  }

  /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} start
   * @param Fun
   */
  getAllAddress(masterWalletId:string,chainId:string,start:number,Fun) {
    this.wallet.getAllAddress([masterWalletId,chainId,start, WalletManager.PAGECOUNT], Fun, this.errorFun);
  }

   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} address
   * @param Fun
   */
  getBalanceWithAddress(masterWalletId:string,chainId:string,address:string, Fun) {
    this.wallet.getBalanceWithAddress([masterWalletId,chainId,address], Fun, this.errorFun);
  }

  createMultiSignTransaction(masterWalletId:string,chainId:string,fromAddress:string,toAddress:string,amount,memo:string,Fun){
    this.wallet.createMultiSignTransaction([masterWalletId,chainId,fromAddress,toAddress,amount,memo],Fun,this.errorFun);
  }

  /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} start
   * @param {string} addressOrTxId
   * @param Fun
   */
  getAllTransaction(masterWalletId:string,chainId:string,start,addressOrTxId, Fun) {
    this.wallet.getAllTransaction([masterWalletId,chainId,start, WalletManager.PAGECOUNT, addressOrTxId], Fun, this.errorFun);
  }
   /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param Fun
   */
  registerWalletListener(masterWalletId:string,chainId:string,Fun) {
    this.wallet.registerWalletListener([masterWalletId,chainId], Fun, this.errorFun);
  }

  registerIdListener(chainId:string,Fun) {
    this.wallet.registerIdListener([chainId], Fun, this.errorFun);
  }
  /**
   * @param {string} masterWalletId
   * @param {string} chainId
   * @param {string} message
   * @param {string} payPassword
   * @param Fun
   */
  sign(masterWalletId:string,chainId:string,message, payPassword, Fun) {
    this.wallet.sign([masterWalletId,chainId,message, payPassword], Fun, this.errorFun);
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
    this.wallet.checkSign([masterWalletId,chainId,publicKey, message, signature], Fun, this.errorFun);
  }
  /**
   * @param {string} masterWalletId
   */
  destroyWallet(masterWalletId:string,Fun) {
    this.wallet.destroyWallet([masterWalletId], Fun, this.errorFun);
  }

  deriveIdAndKeyForPurpose(purpose:number,index:number,payPassword:string,Fun){
    this.wallet.deriveIdAndKeyForPurpose([purpose,index,payPassword], Fun, this.errorFun);
  }

  getAllMasterWallets(Fun){
    this.wallet.getAllMasterWallets([], Fun, this.errorFun);
  }
   /**
   * @param {string} masterWalletId
   */
  getBalanceInfo(masterWalletId:string,chainId:string,Fun){
    this.wallet.getBalanceInfo([masterWalletId,chainId], Fun, this.errorFun);
  }
  /**
   * @param {string} masterWalletId
   */
  isAddressValid(masterWalletId:string,address:string,Fun){
      this.wallet.isAddressValid([masterWalletId,address], Fun, this.errorFun);
  }

  generateMnemonic(language:string,Fun){
    this.wallet.generateMnemonic([language],Fun,this.errorFun);
  }

  saveConfigs(Fun){
    this.wallet.saveConfigs([],Fun,this.errorFun);
  }


  getAllChainIds(Fun){
    this.wallet.getAllChainIds([],Fun,this.errorFun);
  }

  /**
   * @param {string} masterWalletId
   */
  getSupportedChains(masterWalletId:string,Fun){
    this.wallet.getSupportedChains([masterWalletId],Fun,this.errorFun);
  }
  /**
   * @param {string} masterWalletId
   */
  getAllSubWallets(masterWalletId:string,Fun){
    this.wallet.getAllSubWallets([masterWalletId],Fun,this.errorFun);
  }
  /**
   * @param {string} masterWalletId
   */
  changePassword(masterWalletId:string,oldPassword:string , newPassword:string ,Fun){
     this.wallet.changePassword([masterWalletId,oldPassword,newPassword],Fun,this.errorFun);
  }

  createTransaction(masterWalletId:string,chainId:string,fromAddress:string , toAddress:string ,amount:number, memo:string, remark: string,Fun){
    this.wallet.createTransaction([masterWalletId,chainId,fromAddress,toAddress,amount,memo, remark],Fun,this.errorFun);
  }

  calculateTransactionFee(masterWalletId:string,chainId:string,rawTransaction:string,feePerKb:number,Fun){
    this.wallet.calculateTransactionFee([masterWalletId,chainId,rawTransaction,feePerKb],Fun,this.errorFun);
  }

  // sendRawTransaction(masterWalletId:string,chainId:string,transactionJson:string ,fee:number, payPassword:string,Fun){
  //   this.wallet.sendRawTransaction([masterWalletId,chainId,transactionJson,fee,payPassword],Fun,this.errorFun);
  // }

  createDID(password:string,Fun){
    this.wallet.createDID([password],Fun,this.errorFun);
  }

  getDIDList(Fun){
    this.wallet.getDIDList([],Fun,this.errorFun);
  }

  destoryDID(did:string,Fun){
    this.wallet.destoryDID([did],Fun,this.errorFun);
  }

  didSetValue(did:string,keyPath:string,value:string,Fun){
    this.wallet.didSetValue([did,keyPath,value],Fun,this.errorFun);
  }

  didGetValue(did:string,keyPath:string,Fun){
    this.wallet.didGetValue([did,keyPath],Fun,this.errorFun);
  }

  didGetHistoryValue(did:string,keyPath:string,Fun){
    this.wallet.didGetValue([did,keyPath],Fun,this.errorFun);
  }

  didGetAllKeys(did:string,start:number,count:number,Fun){
    this.wallet.didGetAllKeys([did,start,count],Fun,this.errorFun);
  }

  didSign(did:string,message:string,password:string,Fun){
    this.wallet.didSign([did,message,password],Fun,this.errorFun);
  }

  didCheckSign(did:string,message:string,signature:string,Fun){
    this.wallet.didCheckSign([did,message,signature],Fun,this.errorFun);
  }

  didGetPublicKey(did:string,Fun){
    this.wallet.didGetPublicKey([did],Fun,this.errorFun);
  }

  createIdTransaction(masterWalletId:string,chainId:string,fromAddress:string,payloadJson:string,programJson:string,memo:string,remark:string,Fun){
     this.wallet.createIdTransaction([masterWalletId,chainId,fromAddress,payloadJson,programJson,memo,remark],Fun,this.errorFun);
  }

  createDepositTransaction(masterWalletId:string,chainId:string,fromAddress:string,toAddress:string,amount:number
                           ,sidechainAccounts:string,sidechainAmounts:string,sidechainIndex:string,memo:string,remark:string,Fun){
    this.wallet.createDepositTransaction([masterWalletId,chainId,fromAddress,toAddress,amount,sidechainAccounts,sidechainAmounts,sidechainIndex,memo,remark],Fun,this.errorFun);
  }

  createWithdrawTransaction(masterWalletId:string,chainId:string,fromAddress:string,toAddress:string,amount:number
                           ,mainchainAccounts:string,mainchainAmounts:string,mainchainIndexs:string,memo:string,remark:string,Fun){
    this.wallet.createWithdrawTransaction([masterWalletId,chainId,fromAddress,toAddress,amount,mainchainAccounts,mainchainAmounts,mainchainIndexs,memo,remark],Fun,this.errorFun);
  }

  getGenesisAddress(masterWalletId:string,chainId:string,Fun){
    this.wallet.getGenesisAddress([masterWalletId,chainId],Fun,this.errorFun);
  }

  didGenerateProgram(did:string,message:string,password:string,Fun){
      this.wallet.didGenerateProgram([did,message,password],Fun,this.errorFun);
  }

 /**
   * @param {string} masterWalletId
   */
  getMasterWalletBasicInfo(masterWalletId:string,Fun){
     this.wallet.getMasterWalletBasicInfo([masterWalletId],Fun,this.errorFun);
  }

  createMultiSignMasterWallet(masterWalletId:string,coSigners:string,requiredSignCount:number,Fun){
                   this.wallet.createMultiSignMasterWallet([masterWalletId,coSigners,requiredSignCount],Fun,this.errorFun);
  }

  createMultiSignMasterWalletWithPrivKey(masterWalletId:string,privKey:string,payPassword:string,coSigners:string,requiredSignCount:number,Fun){
      this.wallet.createMultiSignMasterWalletWithPrivKey([masterWalletId,privKey,payPassword,coSigners,requiredSignCount],Fun,this.errorFun);
  }

  updateTransactionFee(masterWalletId:string,chainId:string,rawTransaction:string,fee:number,Fun){
      this.wallet.updateTransactionFee([masterWalletId,chainId,rawTransaction,fee],Fun,this.errorFun);
  }

  signTransaction(masterWalletId:string,chainId:string,rawTransaction:string,payPassword:string,Fun){
    this.wallet.signTransaction([masterWalletId,chainId,rawTransaction,payPassword],Fun,this.errorFun);
  }

  publishTransaction(masterWalletId:string,chainId:string,rawTransaction:string,Fun){
    this.wallet.publishTransaction([masterWalletId,chainId,rawTransaction],Fun,this.errorFun);
  }

  getMasterWalletPublicKey(masterWalletId:string,Fun){
    this.wallet.getMasterWalletPublicKey([masterWalletId],Fun,this.errorFun);
  }

  getSubWalletPublicKey(masterWalletId:string,chainId:string,Fun){
    this.wallet.getSubWalletPublicKey([masterWalletId,chainId],Fun,this.errorFun);
  }

  createMultiSignMasterWalletWithMnemonic(masterWalletId:string,mnemonic:string,phrasePassword:string,payPassword:string,coSignersJson:string,requiredSignCount:string,language:string,Fun){
     this.wallet.createMultiSignMasterWalletWithMnemonic([masterWalletId,mnemonic,phrasePassword,payPassword,coSignersJson,requiredSignCount,language],Fun,this.errorFun);
  }

  errorFun(error) {
    alert("错误信息：" + JSON.stringify(error));
    //this.native.toast(error);
  }


}


