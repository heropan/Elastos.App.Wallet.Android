import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddpublickeyPage} from '../../pages/addpublickey/addpublickey';
import {AddprivatekeyPage} from '../../pages/addprivatekey/addprivatekey';
@Component({
  selector: 'page-walltemode',
  templateUrl: 'walltemode.html',
})
export class WalltemodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltemodePage');
  }

  wayOne(){
     this.navCtrl.push(AddpublickeyPage);
  }

  wayTwo(){
     this.navCtrl.push(AddprivatekeyPage);
  }

}
