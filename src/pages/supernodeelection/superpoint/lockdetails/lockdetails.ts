import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';

/**
 * Generated class for the LockdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lockdetails',
  templateUrl: 'lockdetails.html',
})
export class LockdetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public  viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockdetailsPage');
  }

  click_close(){
    console.log("click_close");
    this.viewCtrl.dismiss(null);
  }

  click_button(){
    this.viewCtrl.dismiss(1);
  }

}
