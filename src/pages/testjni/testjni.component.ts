import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';


@Component({
  selector: 'app-testjni',
  templateUrl: './testjni.component.html',
})
export class TestJniComponent  extends BaseComponent implements OnInit  {
  masterWalletId:string ="1";
  phrasePassword:string ="66666666";
  payPassword:string ="66666666";
  backupPassword:string="66666666";
  keystorePath:string ="ssssss";
  mnemonic:string ="sssssss";
  language:string ="english";
  singMessage:string;
  fromAddress:string="sssss";
  toAddress:string="sssss";
  chinaId:string ="Ela";
  adress:string;
  interfaces = [
                {id:19,name:"getAllMasterWallets"},
                {id:0,name:"createSubWallet"},
                {id:1,name:"recoverSubWallet"},
                {id:2,name:"getPublicKey"},
                {id:3,name:"createMasterWallet"},
                {id:4,name:"importWalletWithKeystore"},
                {id:5,name:"importWalletWithMnemonic"},
                {id:6,name:"exportWalletWithKeystore"},
                {id:7,name:"exportWalletWithMnemonic"},
                {id:8,name:"getBalance"},
                {id:9,name:"createAddress"},
                {id:10,name:"getAllAddress"},
                {id:11,name:"getBalanceWithAddress"},
                {id:12,name:"sendTransaction"},
                {id:13,name:"generateMultiSignTransaction"},
                {id:14,name:"getAllTransaction"},
                {id:15,name:"registerWalletListener"},
                {id:16,name:"checkSign"},
                {id:17,name:"sing"},
                {id:18,name:"deriveIdAndKeyForPurpose"},
                {id:20,name:"destroyWallet"},
                {id:21,name:"isAddressValid"},
                {id:22,name:"getBalanceInfo"},
                {id:23,name:"initializeMasterWallet"},
                {id:24,name:"generateMnemonic"},
                {id:25,name:"saveConfigs"}
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
         this.getPublicKey();
         break;
       case 3:
          this.createMasterWallet(this.masterWalletId,this.language);
         break;
       case 4:
          this.importWalletWithKeystore(this.masterWalletId,"sssss",this.backupPassword,this.payPassword,this.phrasePassword);
         break;
       case 5:
          this.importWalletWithMnemonic(this.masterWalletId,this.mnemonic,this.phrasePassword,this.payPassword,this.language);
         break;
       case 6:
          this.exportWalletWithKeystore(this.backupPassword,this.payPassword,"sssss");
         break;
       case 7:
          this.exportWalletWithMnemonic(this.backupPassword);
         break;
       case 8:
            this.getBalance();
         break;
       case 9:
             this.createAddress(this.chinaId);
         break;
       case 10:
            this.getAllAddress(this.chinaId);
         break;
       case 11:
            this.getBalanceWithAddress(this.chinaId);
         break;
      case 12:
            this.sendTransaction(this.chinaId,this.fromAddress,this.toAddress,1,1,this.payPassword,"ssss");
         break;
      case 13:
           this.generateMultiSignTransaction();
         break;
      case 14:
          this.getAllTransaction();
        break;
        case 15:
        this.registerWalletListener(this.chinaId);
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
         this.getAllMasterWallets();
        break;
      case 20:
         this.destroyWallet(this.masterWalletId);
        break;
      case 21:
         this.isAddressValid(this.adress);
         break;
      case 22:
        this.getBalanceInfo(this.chinaId);
         break;
      case 23:
        this.initializeMasterWallet(this.masterWalletId,this.mnemonic,this.payPassword,this.payPassword);
        break;
      case 24:
         this.generateMnemonic();
        break;
      case 25:
        this.saveConfigs();
        break;
      case 26:
        this.getWalletId();
        break;
     }
   }

   generateMnemonic(){
     this.walletManager.generateMnemonic((result)=>{
          this.mnemonic = result;
          alert("住记词"+JSON.stringify(result));
     });
   }

   destroyWallet(masterWalletId:string){
       this.walletManager.destroyWallet(masterWalletId,(result)=>{
              alert("删除主钱包成功")
       });
   }

   createSubWallet(){
      this.walletManager.createSubWallet("Ela",this.payPassword,false,0,(result)=>{
        alert("子钱包");
        alert(JSON.stringify(result));
      });
   }

   recoverSubWallet(){
    this.walletManager.recoverSubWallet("Ela",this.payPassword,false,0,0,()=>{
      alert("恢复子钱包");
    });
   }

   getPublicKey(){
     this.walletManager.getPublicKey((result)=>{
       alert("获取公钥成功");
       alert(JSON.stringify(result));
     })
   }

   createMasterWallet(masterWalletId,language){
    this.walletManager.createMasterWallet(masterWalletId,language,(result)=>{
                   alert("创建主钱包成功");
     });
   }

   importWalletWithKeystore(masterWalletId:string,keystorePath:string,backupPassWord:string,payPassWord:string,phrasePassword:string){
         this.walletManager.importWalletWithKeystore(masterWalletId,keystorePath,backupPassWord,payPassWord,phrasePassword,()=>{
                      alert("导入keystore成功");
         })
   }

   importWalletWithMnemonic(masterWalletId:string,mnemonic:string ,phrasePassword:string ,payPassWord:string,language:string){
       this.walletManager.importWalletWithMnemonic(masterWalletId,mnemonic,phrasePassword,payPassWord,language,()=>{
        alert("导入住记词成功");
       });
   }

   exportWalletWithKeystore(backupPassword: string,payPassWord:string,keystorePath:string,){
       this.walletManager.exportWalletWithKeystore(backupPassword,payPassWord,keystorePath,(result)=>{
        alert("导出keystore成功");
       });
   }

   exportWalletWithMnemonic(backupPassword:string ){
          this.walletManager.exportWalletWithMnemonic(backupPassword,(result)=>{
                   alert(JSON.stringify(result));
          });
   }

   createAddress(chinaId:string){
         this.walletManager.createAddress(chinaId,(result)=>{
                this.adress = result;
                alert(JSON.stringify(result));
         });
   }

   getAllAddress(chinaId:string){
        this.walletManager.getAllAddress(chinaId,0,(result)=>{
            alert(JSON.stringify(result));
        });
   }

   getBalanceWithAddress(chinaId:string){
        this.walletManager.getBalanceWithAddress(chinaId,"eeeeeeee",(result)=>{
            alert(JSON.stringify(result));
        });
   }

   sendTransaction(chinaId:string,fromAddress:string, toAddress:string, amount:number, fee:number, payPassword:string, memo:string){
       this.walletManager.sendTransaction(chinaId,fromAddress,toAddress,amount,fee,payPassword,memo,(result)=>{
                alert(JSON.stringify(result));
       });
   }

   generateMultiSignTransaction(){
      this.walletManager.generateMultiSignTransaction(this.chinaId,this.fromAddress,this.toAddress,1,1,this.payPassword,"sssss",(result)=>{
        alert(JSON.stringify(result));
      });
   }

   getAllTransaction(){
      this.walletManager.getAllTransaction(this.chinaId,0,"123455",(result)=>{
      alert(JSON.stringify(result));
     });
   }

   registerWalletListener(chinaId:string){
     this.walletManager.registerWalletListener(chinaId,(resust)=>{
             alert("监听注册成功");
     });
   }

   checkSign(address:string, message:string, signature:string, payPassword:string){
         this.walletManager.checkSign(this.chinaId,address,message,signature,payPassword,(result)=>{
          alert(JSON.stringify(result));
         });
   }

   sign(message:string,payPassword:string){
    this.walletManager.sign(this.chinaId,message, payPassword,(result)=>{
         alert(JSON.stringify(result));
         this.singMessage = result;
    })
   }

   getBalance(){
     this.walletManager.getBalance(this.chinaId,()=>{
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

   isAddressValid(address:string){
     this.walletManager.isAddressValid(address,(result)=>{
        alert("isAddressValid===="+JSON.stringify(result));
     });
   }

   getBalanceInfo(chinaId:string){
     this.walletManager.getBalanceInfo(chinaId,(result)=>{
        alert("余额信息："+JSON.stringify(result));
     });
   }

   initializeMasterWallet(masterWalletId,mnemonic,phrasePassword,payPassWord){
     this.walletManager.initializeMasterWallet(masterWalletId,mnemonic,phrasePassword,this.payPassword,(result)=>{
             alert("主钱包初始化成功");
     });
   }

   saveConfigs(){
     this.walletManager.saveConfigs((resust)=>{
         alert("保存配置成功");
     })
   }

   getWalletId(){
     this.walletManager.getWalletId((result)=>{
         alert("主钱包id=="+JSON.stringify(result));
     });
   }

}
