import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public walletManager: WalletManager,public native: Native,public localStorage: LocalStorage) {
  }

  ionViewDidLoad() {
    this.initializeApp();
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
                    console.log("==========getAllMasterWallets==========="+JSON.stringify(data));
                    resolve(data);
                 }else{
                  console.log("==========getAllMasterWallets====error======="+JSON.stringify(data));
                  reject(data);
                 }
          },(data)=>{
            console.log("====error======="+JSON.stringify(data));
            reject(data);
          })
     });
  }

  successHandle(data){
      let idList = JSON.parse(data);
      let type = Util.GetQueryString("type");
      if(idList.length === 0){
         this.handleNull(type);
       }else{
         this.localStorage.getCurMasterId().then((data) => {
          console.log("=====getCurMasterId=====" + data);
          let item = JSON.parse(data);
          console.log("====getCurMasterId====" + JSON.stringify(item));
          Config.setCurMasterWalletId(item["masterId"]);
          Config.setMasterWalletIdList(idList);
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
          Config.setMasterWalletIdList([]);
          this.native.setRootRouter(LauncherComponent);
      });
    }else{
      Config.setMasterWalletIdList([]);
      this.native.setRootRouter(LauncherComponent);
    }
  }

}
