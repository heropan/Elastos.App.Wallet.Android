import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PopupProvider} from "../../../../providers/popup";

/**
 * Generated class for the VotemanagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-votemanage',
  templateUrl: 'votemanage.html',
})
export class VotemanagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public popupProvider: PopupProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotemanagePage');
  }

  logout(){
    this.popupProvider.ionicConfirm('confirmTitle', 'log-out-subTitle').then((data) => {
      if (data) {

      }
    });
  }
}
