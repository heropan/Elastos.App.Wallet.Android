import { Component } from '@angular/core';
import { NavController, NavParams ,Events} from 'ionic-angular';
import {WalletManager} from '../../providers/WalletManager';
import {TabsComponent} from "../tabs/tabs.component";
import {Native} from "../../providers/Native";
import {Config} from "../../providers/Config";
import {LocalStorage} from "../../providers/Localstorage";
@Component({
  selector: 'page-addpublickey',
  templateUrl: 'addpublickey.html',
})
export class AddpublickeyPage {
  masterWalletId:string = "1";
  private msobj:any;
  public  publicKeyArr:any=[];
  public  name:string ="";
  public isOnly:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public walletManager:WalletManager,public native :Native,public localStorage:LocalStorage,public events:Events) {
    console.log("=========AddpublickeyPage"+JSON.stringify(this.navParams.data));
    this.msobj = this.navParams.data;
    this.name = this.msobj["name"];
    let totalCopayers = 0;
    if(this.msobj["payPassword"]){
      this.isOnly = false;
      totalCopayers = this.msobj["totalCopayers"]-1;
    }else{
      this.isOnly = true;
      totalCopayers = this.msobj["totalCopayers"];
    }

    for(let index=0 ;index<totalCopayers;index++){
          let item = {index:index,publicKey:""};
          this.publicKeyArr.push(item);
    }
    this.masterWalletId = Config.uuid(6,16);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpublickeyPage');
  }

  nextPage(){
    this.native.showLoading().then(()=>{
      if(this.msobj["payPassword"]){
        this.createWalletWithMnemonic();
      }else{
       this.createWallet();
      }
    });
  }

  createWallet(){
    let copayers = this.getTotalCopayers();
    this.walletManager.createMultiSignMasterWallet(this.masterWalletId,copayers,this.msobj["requiredCopayers"],(data)=>{
              if(data['success']){
                this.createSubWallet("ELA");
              }else{
                this.native.hideLoading();
                alert("=====createMultiSignMasterWallet===error=="+JSON.stringify(data));
              }
    });
   }

  getTotalCopayers(){
    let arr = [];
    for(let index = 0;index<this.publicKeyArr.length;index++){
          let item = this.publicKeyArr[index];
          let publicKey =item["publicKey"].replace(/^\s+|\s+$/g,"");
          arr.push(publicKey);
    }
    return JSON.stringify(arr);
  }

  createSubWallet(chainId){
    // Sub Wallet
    this.walletManager.createSubWallet(this.masterWalletId,chainId,0, (data)=>{
          if(data["success"]){
               console.log("====createSubWallet===="+JSON.stringify(data));
               this.registerWalletListener(this.masterWalletId,chainId);
               this.saveWalletList();
          }else{
                this.native.hideLoading();
                alert("createSubWallet=error:"+JSON.stringify(data));
          }
    });
  }

  saveWalletList(){
        Config.getMasterWalletIdList().push(this.masterWalletId);
            this.localStorage.saveCurMasterId({masterId:this.masterWalletId}).then((data)=>{
              let walletObj = this.native.clone(Config.masterWallObj);
              walletObj["id"]   = this.masterWalletId;
              walletObj["wallname"] = this.name;
              walletObj["Account"] = {"SingleAddress":true,"Type":"Multi-Sign","Readonly":this.isOnly};
              this.localStorage.saveMappingTable(walletObj).then((data)=>{
                let mappingList = this.native.clone(Config.getMappingList());
                    mappingList[this.masterWalletId] = walletObj;
                    console.log("=====mappingList===="+JSON.stringify(mappingList));
                    Config.setMappingList(mappingList);
                    this.native.hideLoading();
                    Config.setCurMasterWalletId(this.masterWalletId);
                    this.native.setRootRouter(TabsComponent);
              });
            });
  }






  createWalletWithMnemonic(){
      let copayers = this.getTotalCopayers();
      this.walletManager.createMultiSignMasterWalletWithMnemonic(this.masterWalletId,this.msobj["mnemonicStr"],this.msobj["mnemonicPassword"],this.msobj["payPassword"],copayers,this.msobj["requiredCopayers"],(data)=>{
          if(data['success']){
            console.log("=====createMultiSignMasterWalletWithMnemonic======"+JSON.stringify(data));
            this.createMnemonicSubWallet("ELA",this.msobj["payPassword"]);
          }else{
            this.native.hideLoading();
            alert("=====createMultiSignMasterWalletWithMnemonic=======error"+JSON.stringify(data));
          }
      });
  }

  createMnemonicSubWallet(chainId,password){
    // Sub Wallet
    this.walletManager.createSubWallet(this.masterWalletId,chainId,0, (data)=>{
          if(data["success"]){
               this.native.hideLoading();
               console.log("====createSubWallet===="+JSON.stringify(data));
               this.registerWalletListener(this.masterWalletId,chainId);
               this.saveWalletList();
          }else{
                this.native.hideLoading();
                alert("createSubWallet=error:"+JSON.stringify(data));
          }
    });
  }

  registerWalletListener(masterId,coin){
    this.walletManager.registerWalletListener(masterId,coin,(data)=>{
          if(!Config.isResregister(masterId,coin)){
            Config.setResregister(masterId,coin,true);
          }
           this.events.publish("register:update",masterId,coin,data);
    });
  }

}
