import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';


@Component({
  selector: 'app-testjni',
  templateUrl: './testjni.component.html',
})
export class TestJniComponent  extends BaseComponent implements OnInit  {
  phrasePassword:string ="66666666";
  payPassword:string ="66666666";
  backupPassword:string="66666666";
  keystorePath:string ="ssssss";
  mnemonic:string ="sssssss";
  language:string ="english";
  singMessage:string;
  fromAddress:string="sssss";
  toAddress:string="sssss";
  interfaces = [
                {id:19,name:"getAllMasterWallets"},
                {id:0,name:"createSubWallet"},
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
          this.createMasterWallet(this.phrasePassword,this.payPassword,this.language);
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
          this.exportWalletWithMnemonic(this.payPassword);
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
            this.sendTransaction(this.fromAddress,this.toAddress,1,1,this.payPassword,"ssss");
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
          this.checkSign("ssssss",this.singMessage,"sssss",this.payPassword);
        break;
      case 17:
           this.sign("1111111111111",this.payPassword);
       break;
      case 18:
         this.deriveIdAndKeyForPurpose(1,1,this.payPassword);
      break;
      case 19:
         alert("sssss===1");
         this.getAllMasterWallets();
        break;
     }
   }

   createSubWallet(){
      this.walletManager.createSubWallet(0,"Ela",0,this.payPassword,false,0,(result)=>{
        alert("子钱包");
        alert(JSON.stringify(result));
      });
   }

   recoverSubWallet(){
    this.walletManager.recoverSubWallet(0,"Ela",0,this.payPassword,false,0,0,()=>{
      alert("恢复子钱包");
    });
   }

   getPubKey(){
     this.walletManager.getPubKey((result)=>{
       alert("获取公钥成功");
       alert(JSON.stringify(result));
     })
   }

   createMasterWallet(phrasePassword,payPassword,language){
    this.walletManager.createMasterWallet(phrasePassword,payPassword,language,()=>{
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

   exportWalletWithMnemonic(payPassword:string ){
          this.walletManager.exportWalletWithMnemonic(payPassword,(result)=>{
                   alert(JSON.stringify(result));
          });
   }

   createAddress(){
         this.walletManager.createAddress((result)=>{
                alert(JSON.stringify(result));
         });
   }

   getAllAddress(){
        this.walletManager.getAllAddress(0,(result)=>{
            alert(JSON.stringify(result));
        });
   }

   getBalanceWithAddress(){
        this.walletManager.getBalanceWithAddress("eeeeeeee",(result)=>{
            alert(JSON.stringify(result));
        });
   }

   sendTransaction(fromAddress:string, toAddress:string, amount:number, fee:number, payPassword:string, memo:string){
       this.walletManager.sendTransaction(fromAddress,toAddress,amount,fee,payPassword,memo,(result)=>{
                alert(JSON.stringify(result));
       });
   }

   generateMultiSignTransaction(){
      this.walletManager.generateMultiSignTransaction(this.fromAddress,this.toAddress,1,1,this.payPassword,"sssss",(result)=>{
        alert(JSON.stringify(result));
      });
   }

   getAllTransaction(){
      this.walletManager.getAllTransaction(0,"123455",(result)=>{
      alert(JSON.stringify(result));
     });
   }

   addWalletListener(){

   }

   checkSign(address:string, message:string, signature:string, payPassword:string){
         this.walletManager.checkSign(address,message,signature,payPassword,(result)=>{
          alert(JSON.stringify(result));
         });
   }

   sign(message:string,payPassword:string){
    this.walletManager.sign(message, payPassword,(result)=>{
         alert(JSON.stringify(result));
         this.singMessage = result;
    })
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

   getAllMasterWallets(){
       this.walletManager.getAllMasterWallets((result)=>{
            alert("allAllMasterWallets"+JSON.stringify(result));
       });
   }

}
