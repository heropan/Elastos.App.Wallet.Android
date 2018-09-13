import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CreatemultiwalltePage} from '../../pages/createmultiwallte/createmultiwallte';
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-walltelist',
  templateUrl: 'walltelist.html',
})
export class WalltelistPage {
   items = [
    '钱包1',
    '钱包2',
];
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltelistPage');
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
    this.navCtrl.pop();
    this.events.publish("wallte:update",item);
  }

  nextPage(){
    this.navCtrl.push(CreatemultiwalltePage);
  }

}
