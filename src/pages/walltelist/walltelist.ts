import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CreatemultiwalltePage} from '../../pages/createmultiwallte/createmultiwallte';

@Component({
  selector: 'page-walltelist',
  templateUrl: 'walltelist.html',
})
export class WalltelistPage {
   items = [
    '钱包1',
    '钱包2',
];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltelistPage');
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  nextPage(){
    this.navCtrl.push(CreatemultiwalltePage);
  }

}
