import { Component,NgZone} from '@angular/core';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public localStorage:LocalStorage,public native:Native,private zone:NgZone) {
        this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltelistPage');
  }

  init(){
     //this.items = Config.getMasterWalletIdList();
     let mappList = Config.getMappingList();
     console.log("=========mappList==========="+JSON.stringify(mappList));
     //let mappList ={"2C66B4":{"id":"2C66B4","wallname":"ss","name":"ss"}};
     this.zone.run(()=>{
      this.items = Config.objtoarr(mappList);
     })
     console.log("=========this.items==========="+JSON.stringify(this.items));
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
    let id = item["id"];
    this.localStorage.saveCurMasterId({masterId:id}).then((data)=>{
      //this.localStorage.remove("coinListCache").then((data)=>{
        this.navCtrl.pop();
        this.events.publish("wallte:update",id);
      //});
    })
  }

  nextPage(){
    this.native.Go(this.navCtrl,LauncherComponent);
  }



}
