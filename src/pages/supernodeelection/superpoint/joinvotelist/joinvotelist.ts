import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {Native} from "../../../../providers/Native";
/**
 * Generated class for the JoinvotelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-joinvotelist',
  templateUrl: 'joinvotelist.html',
})
export class JoinvotelistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public native: Native) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinvotelistPage');
  }

  votingRules(){
      this.openPayModal();
  }

  myvote(){
    this.native.Go(this.navCtrl,'MyvotePage');
  }

  tovote(){
    this.native.Go(this.navCtrl,'PointvotePage');
  }

  openPayModal(){
    const modal = this.modalCtrl.create("VotingrulesPage",{});
    modal.onDidDismiss(data => {
      if(data){
      }
    });
    modal.present();
  }

}
