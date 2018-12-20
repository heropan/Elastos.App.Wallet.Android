import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Native } from '../../../../providers/Native';

/**
 * Generated class for the MyvotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myvote',
  templateUrl: 'myvote.html',
})
export class MyvotePage {

    public voteList = [{"name":"xxxxxxx","votes":"No5"},{"name":"xxxxxxx1111","votes":"No6"}];
    //public voteList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public native: Native) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyvotePage');
  }

  changevote(){
      this.native.Go(this.navCtrl,"PointvotePage",{"selectNode":["4","5"]});
  }

}
