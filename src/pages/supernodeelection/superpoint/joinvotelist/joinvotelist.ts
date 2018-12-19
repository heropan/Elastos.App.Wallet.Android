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

  public nodelist = ["0","1","2","4","5","7","8","9"];


  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public native: Native) {

  }

  ionViewDidLoad() {

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

  jumpNodeInformation(status){
    console.log("===jumpNodeInformation==="+status);
    this.native.Go(this.navCtrl,'NodeinformationPage',{"status":status});
  }

}
