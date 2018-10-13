import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WalletManager} from '../../providers/WalletManager';
import {TabsComponent} from "../tabs/tabs.component";
import {Native} from "../../providers/Native";
import {Config} from "../../providers/Config";
import {LocalStorage} from "../../providers/Localstorage";
@Component({
  selector: 'page-addprivatekey',
  templateUrl: 'addprivatekey.html',
})
export class AddprivatekeyPage {
  masterWalletId:string = "1";
  public  publicKey:string="";
  private msobj:any;
  public  publicKeyArr:any=[];
  public  name:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public walletManager: WalletManager,public native:Native,public localStorage:LocalStorage) {
    console.log("=========AddpublickeyPage"+JSON.stringify(this.navParams.data));
    this.msobj = this.navParams.data;
    this.name = this.msobj["name"];
    let totalCopayers = this.msobj["totalCopayers"];
    for(let index=0 ;index<totalCopayers-1;index++){
        let item ={index:index,publicKey:this.publicKey};
        this.publicKeyArr.push(item);
    }

    this.masterWalletId = Config.uuid(6,16);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprivatekeyPage');
  }

  nextPage(){
     this.native.showLoading();
     this.createWallet();
  }

  createWallet(){
     let copayers = this.getTotalCopayers();
     this.walletManager.createMultiSignMasterWalletWithPrivKey(this.masterWalletId,this.msobj["importText"],this.msobj["passWord"],copayers,this.msobj["requiredCopayers"],(data)=>{
               if(data['success']){
                 //this.native.setRootRouter(TabsComponent);
                 this.createSubWallet("ELA");
               }else{
                this.native.hideLoading();
                alert("=====createMultiSignMasterWalletWithPrivKey===error==="+JSON.stringify(data));
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

}
