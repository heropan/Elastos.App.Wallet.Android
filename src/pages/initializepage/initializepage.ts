import { Component } from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';
import {LauncherComponent} from "../../pages/launcher/launcher.component";
import {WalletManager} from "../../providers/WalletManager";
import {Native} from "../../providers/Native";
import {Util} from "../../providers/Util";
import {Config} from "../../providers/Config";
import { TabsComponent } from '../../pages/tabs/tabs.component';
import { LocalStorage } from "../../providers/Localstorage";
import { PaymentConfirmComponent } from "../../pages/coin/payment-confirm/payment-confirm.component";
import { DidLoginComponent } from "../../pages/third-party/did-login/did-login.component";

@Component({
  selector: 'page-initializepage',
  templateUrl: 'initializepage.html',
})
export class InitializepagePage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public walletManager: WalletManager,public native: Native,public localStorage: LocalStorage,public events: Events) {

  }

  ionViewDidLoad() {

    this.native.showLoading().then(()=>{
      this.initializeApp();
    });

  }


  initializeApp(){
     this.load().then((data)=>{
      this.successHandle(data["success"]);
     }).catch((data)=>{
      this.errorHandle(data);

     });
  }

  public load(): Promise<any>{
     return  new Promise((resolve, reject) =>{
          this.walletManager.getAllMasterWallets((data)=>{
                 if(data["success"]){
                    resolve(data);
                 }else{
                  reject(data);
                 }
          });
     });
  }

  successHandle(data){
      let idList = JSON.parse(data);
      let type = Util.GetQueryString("type");
      if(idList.length === 0){
         Config.setMappingList({});
         this.handleNull(type);
       }else{
         this.localStorage.getCurMasterId().then((data) => {
          let item = JSON.parse(data);
          Config.setCurMasterWalletId(item["masterId"]);
          Config.setMasterWalletIdList(idList);
          this.handleMappingdata(idList);
          this.getAllsubWallet(item["masterId"],type);
        });

       }
  }

  public errorHandle(data){
       let error = data["error"];
       console.log("====error ====="+JSON.stringify(error));

       if(error["code"] === 10002){
        console.log("====code ====="+error["code"]);
        let type = Util.GetQueryString("type");
         this.handleNull(type);
       }else{
         this.native.hideLoading();
       }
  }

  handleNull(type){
    if (type == 'payment') {
      let account = Util.GetQueryString("account");
      let toAddress = Util.GetQueryString("address");
      let memo = Util.GetQueryString("memo");
      let payment_params = {
        account: account,
        toAddress: toAddress,
        memo: memo
      }
      this.localStorage.set('payment', payment_params).then(()=>{
         this.native.hideLoading();
          Config.setMasterWalletIdList([]);
          this.native.setRootRouter(LauncherComponent);
      });
    }else{
      this.native.hideLoading();
      Config.setMasterWalletIdList([]);
      this.native.setRootRouter(LauncherComponent);
    }
  }

  handleMappingdata(idList){
    let mappList = Config.getMappingList();
    let list = {};
    for(let index in idList){
        let id = idList[index];
        list[id] = mappList[id];
    }
    Config.setMappingList(list);
    console.log("===setMappingList===="+JSON.stringify(Config.getMappingList()));
  }

  getAllsubWallet(masterId,type){
      this.walletManager.getAllSubWallets(masterId,(data)=>{
        if(data["success"]){

          let chinas = JSON.parse(data["success"]);
          for (let index in chinas) {
            let chain =  chinas[index];
            this.registerWalletListener(masterId,chain);
          }

          this.native.hideLoading();
          switch (type) {
            case "payment":
              this.native.setRootRouter(PaymentConfirmComponent);
              break;
            case "did_login":
              this.native.setRootRouter(DidLoginComponent);
              break;
            default:
              this.native.setRootRouter(TabsComponent);
              break;
          }
        }
      });
  }

  registerWalletListener(masterId,coin){

    this.walletManager.registerWalletListener(masterId,coin,(data)=>{
            console.log("==========="+Config.isResregister(masterId,coin))
            if(!Config.isResregister(masterId,coin)){
              //console.log("==========="+Config.isResregister(masterId,coin))
              Config.setResregister(masterId,coin,true);
            }
            this.events.publish("register:update",masterId,coin,data);
    });
  }

}
