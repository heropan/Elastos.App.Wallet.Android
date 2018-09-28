import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LauncherComponent} from "../../pages/launcher/launcher.component";
import {WalletManager} from "../../providers/WalletManager";
import {Native} from "../../providers/Native";
@Component({
  selector: 'page-initializepage',
  templateUrl: 'initializepage.html',
})
export class InitializepagePage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public walletManager: WalletManager,public native: Native) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitializepagePage');
    this.initializeApp();
  }


  initializeApp(){
    console.log("============initializeApp============1111");
     this.load().then((data)=>{
      console.log("============initializeApp============33333");
      this.native.setRootRouter(LauncherComponent);
     });
  }

  public load(): Promise<any>{
    console.log("============initializeApp============222222");
     return  new Promise((resolve, reject) =>{
          this.walletManager.getAllMasterWallets((data)=>{
                 if(data["success"]){
                    console.log("==========getAllMasterWallets==========="+JSON.stringify(data));
                    resolve(data);
                 }else{
                  console.log("==========getAllMasterWallets====error======="+JSON.stringify(data));
                  reject(data);
                 }
          })
     });
  }

}
