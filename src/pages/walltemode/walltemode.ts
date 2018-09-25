import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddpublickeyPage} from '../../pages/addpublickey/addpublickey';
import {ImportprivatekeyPage} from '../../pages/importprivatekey/importprivatekey';
import {WalletCreateComponent} from '../../pages/wallet/wallet-create/wallet-create.component';
@Component({
  selector: 'page-walltemode',
  templateUrl: 'walltemode.html',
})
export class WalltemodePage {
  public navObj:any;
  public totalCopayers:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("========="+JSON.stringify(this.navParams.data));
     this.navObj = this.navParams.data;
     this.totalCopayers = this.navParams.data["totalCopayers"];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltemodePage');
  }

  wayOne(){
    this.navCtrl.push(WalletCreateComponent,this.navObj);
     //this.navCtrl.push(AddpublickeyPage,this.navObj);
  }

  wayTwo(){
     this.navCtrl.push(ImportprivatekeyPage,this.navObj);
  }

  wayThree(){
    this.navCtrl.push(AddpublickeyPage,this.navObj);
  }

}
