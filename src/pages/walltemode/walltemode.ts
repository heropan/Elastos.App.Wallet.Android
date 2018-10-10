import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ImportprivatekeyPage} from '../../pages/importprivatekey/importprivatekey';
import {WalletCreateComponent} from '../../pages/wallet/wallet-create/wallet-create.component';
import {CreatewalletnamePage} from "../../pages/createwalletname/createwalletname";
import {Native} from "../../providers/Native";
@Component({
  selector: 'page-walltemode',
  templateUrl: 'walltemode.html',
})
export class WalltemodePage {
  public navObj:any;
  public totalCopayers:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public native: Native) {
    console.log("========="+JSON.stringify(this.navParams.data));
     this.navObj = this.navParams.data;
     this.totalCopayers = this.navParams.data["totalCopayers"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltemodePage');
  }

  wayOne(){
    //this.navCtrl.push(WalletCreateComponent,this.navObj);
     //this.navCtrl.push(AddpublickeyPage,this.navObj);
     this.native.Go(this.navCtrl,WalletCreateComponent,this.navObj);
  }

  wayTwo(){
     //this.navCtrl.push(ImportprivatekeyPage,this.navObj);
     this.native.Go(this.navCtrl,ImportprivatekeyPage,this.navObj);
  }

  wayThree(){
    //this.navCtrl.push(AddpublickeyPage,this.navObj);
    this.native.Go(this.navCtrl,CreatewalletnamePage,this.navObj);
  }

}
