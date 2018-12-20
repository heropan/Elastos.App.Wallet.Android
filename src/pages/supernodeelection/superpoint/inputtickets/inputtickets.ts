import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import {Util} from "../../../../providers/Util";
import {Native} from "../../../../providers/Native";
/**
 * Generated class for the InputticketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inputtickets',
  templateUrl: 'inputtickets.html',
})
export class InputticketsPage {
  public votes;
  constructor(public navCtrl: NavController, public navParams: NavParams,public  viewCtrl: ViewController,public native :Native) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputticketsPage');
  }

  click_close(){
    this.viewCtrl.dismiss(null);
  }

  click_button(){

    if(Util.isNull(this.votes)){
      this.native.toast_trans("please-input-votes");
        return;
    }

    if(parseInt(this.votes) <= 0){
      this.native.toast_trans("please-input-votes");
       return;
    }
    this.viewCtrl.dismiss({"votes":this.votes});
  }

}
