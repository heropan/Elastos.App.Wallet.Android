import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Native } from '../../../providers/Native';
import { Config } from '../../../providers/Config';

@IonicPage()
@Component({
  selector: 'page-superpoint',
  templateUrl: 'superpoint.html',
})
export class SuperpointPage {
  public isExitNode:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public native :Native) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuperpointPage');
  }

  vote(){
    console.log('ionViewDidLoad SuperpointPage1');
    this.native.Go(this.navCtrl,'JoinvotelistPage');
  }

  singup(){
    console.log('ionViewDidLoad SuperpointPage2');
    this.native.Go(this.navCtrl,'SignupPage');
  }

  emanagement(){
    this.native.Go(this.navCtrl,'VotemanagePage');
  }
}
