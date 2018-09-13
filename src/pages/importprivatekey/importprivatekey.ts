import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-importprivatekey',
  templateUrl: 'importprivatekey.html',
})
export class ImportprivatekeyPage {
  public importText:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportprivatekeyPage');
  }

  import(){

  }

}
