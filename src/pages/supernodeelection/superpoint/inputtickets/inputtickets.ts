import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public  viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputticketsPage');
  }

  click_close(){
    this.viewCtrl.dismiss(null);
  }

  click_button(){
    this.viewCtrl.dismiss(null);
  }

}
