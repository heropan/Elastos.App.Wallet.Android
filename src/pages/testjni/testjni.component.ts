import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';


@Component({
  selector: 'app-testjni',
  templateUrl: './testjni.component.html',
})
export class TestJniComponent  extends BaseComponent implements OnInit  {
  backupPassword:string ="666666";
  payPassword:string ="666666";
  keystorePath:string ="ssssss";
  mnemonic:string ="sssssss";
  language:string ="english";
  interfaces = [{id:0,name:"createSubWallet"},
                {id:1,name:"recoverSubWallet"},
                {id:2,name:"getPubKey"},
                {id:3,name:"createMasterWallet"},
                {id:4,name:"importWalletWithKeystore"},
                {id:5,name:"importWalletWithMnemonic"},
                {id:6,name:"exportWalletWithKeystore"},
                {id:7,name:"exportWalletWithMnemonic"},
                {id:8,name:"getBalanceFun"},
                {id:9,name:"createAddress"},
                {id:10,name:"getAllAddress"},
                {id:11,name:"getBalanceWithAddress"},
                {id:12,name:"sendTransaction"},
                {id:13,name:"generateMultiSignTransaction"},
                {id:14,name:"getAllTransaction"},
                {id:15,name:"addWalletListener"},
                {id:16,name:"checkSign"},
                {id:17,name:"sing"},
                {id:18,name:"deriveIdAndKeyForPurpose"}
              ];
  ngOnInit() {
  }

  onNext(type): void {
     switch (type){
       case 0:
         this.createSubWallet();
         break;
       case 1:
         this.recoverSubWallet();
       case 2:
         this.getPubKey();
         break;
       case 3:
          this.createMasterWallet(this.backupPassword,this.payPassword);
         break;
       case 4:
          this.importWalletWithKeystore(this.keystorePath,this.backupPassword,this.payPassword);
         break;
       case 5:
          this.importWalletWithMnemonic(this.mnemonic,this.backupPassword,this.payPassword,this.language);
         break;
       case 6:
          this.exportWalletWithKeystore(this.keystorePath,this.backupPassword);
         break;
       case 7:
          this.exportWalletWithMnemonic();
         break;
       case 8:
            this.getBalanceFun();
         break;
       case 9:
             this.createAddress();
         break;
       case 10:
            this.getAllAddress();
         break;
       case 11:
            this.getBalanceWithAddress();
         break; 
      case 12:
            this.sendTransaction();
         break;
      case 13:
           this.generateMultiSignTransaction();
         break;
      case 14:
          this.getAllTransaction();
        break; 
        case 15:
        this.addWalletListener();
        break;
      case 16:
          this.checkSign();
        break;
      case 17:
           this.sign();
       break;
      case 18:
         this.deriveIdAndKeyForPurpose(1,1,this.payPassword);   
      break;
     }
   }

   createSubWallet(){
      this.walletManager.createSubWallet(0,"Ela",0,this.payPassword,false,0,()=>{
        alert("子钱包");
      });
   }

   recoverSubWallet(){
    this.walletManager.recoverSubWallet(0,"Ela",0,this.payPassword,false,0,0,()=>{
      alert("恢复子钱包");
    });
   }

   getPubKey(){
     this.walletManager.getPubKey(()=>{
       alert("获取公钥成功");
     })
   }

   createMasterWallet(backupPassword,payPassword){
    this.walletManager.createMasterWallet(this.backupPassword,this.payPassword,()=>{
      alert("创建主钱包成功");
     });
   }

   importWalletWithKeystore(keystorePath:string,backupPassWord:string,payPassWord:string){
         this.walletManager.importWalletWithKeystore(keystorePath,backupPassWord,payPassWord,()=>{
                      alert("导入keystore成功");
         })
   }

   importWalletWithMnemonic(mnemonic:string ,backupPassWord:string ,payPassWord:string,language:string){
       this.walletManager.importWalletWithMnemonic(mnemonic,backupPassWord,payPassWord,language,()=>{
        alert("导入住记词成功");
       });
   }

   exportWalletWithKeystore(keystorePath:string, backupPassword: string){
       this.walletManager.exportWalletWithKeystore(keystorePath,backupPassword,(result)=>{
        alert("导出keystore成功");
       });
   }

   exportWalletWithMnemonic(){

   }

   createAddress(){

   }

   getAllAddress(){

   }

   getBalanceWithAddress(){

   }

   sendTransaction(){

   }

   generateMultiSignTransaction(){

   }

   getAllTransaction(){

   }

   addWalletListener(){

   }

   checkSign(){

   }

   sign(){

   }

   getBalanceFun(){
     this.walletManager.getBalanceFun(()=>{
      alert("获取余额");
     })
   }

   deriveIdAndKeyForPurpose(purpose:number,index:number,payPassword:string){
            this.walletManager.deriveIdAndKeyForPurpose(purpose,index,payPassword,(result)=>{
                      alert(JSON.stringify(result));
            });
   }

}
