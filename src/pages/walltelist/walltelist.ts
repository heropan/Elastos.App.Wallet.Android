import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LauncherComponent} from "../launcher/launcher.component";
import { Events } from 'ionic-angular';
import {LocalStorage} from "../../providers/Localstorage";
import {Config} from "../../providers/Config";
import {Native} from "../../providers/Native";
@Component({
  selector: 'page-walltelist',
  templateUrl: 'walltelist.html',
})
export class WalltelistPage {
   items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public localStorage:LocalStorage,public native:Native) {
        this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltelistPage');
  }

  init(){
     this.items = Config.getMasterWalletIdList();
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
    this.localStorage.saveCurMasterId({masterId:item}).then((data)=>{
      this.navCtrl.pop();
      this.events.publish("wallte:update",item);
    })
  }

  nextPage(){
    this.native.setRootRouter(LauncherComponent);
  }

}
