import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NodeinformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nodeinformation',
  templateUrl: 'nodeinformation.html',
})
export class NodeinformationPage {
  public  isStatus:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
         console.log("==========NodeinformationPage"+this.navParams.data["status"]);
         if(this.navParams.data["status"] === 0){
                  this.isStatus = false;
         }else if(this.navParams.data["status"] === 1){
                  this.isStatus = true;
         }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeinformationPage');
  }

  lookOver(){
   this.navCtrl.pop();
  }

  delList(parms){

  }

  addList(parms){

  }

}
