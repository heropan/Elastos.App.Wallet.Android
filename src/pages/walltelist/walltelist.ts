import { Component,NgZone} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LauncherComponent} from "../launcher/launcher.component";
import { Events } from 'ionic-angular';
import {LocalStorage} from "../../providers/Localstorage";
import {Config} from "../../providers/Config";
import {Native} from "../../providers/Native";
import {WalletManager} from "../../providers/WalletManager";
@Component({
  selector: 'page-walltelist',
  templateUrl: 'walltelist.html',
})
export class WalltelistPage {
   items = [];
   masterWalletId:string = "1";
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public localStorage:LocalStorage,public native:Native,private zone:NgZone,public walletManager:WalletManager) {
        this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalltelistPage');
  }

  init(){
     //this.items = Config.getMasterWalletIdList();
     this.masterWalletId = Config.getCurMasterWalletId();
     let mappList = Config.getMappingList();
     //let mappList = {"F89126":{"id":"F89126","wallname":"sd","Account":{"SingleAddress":false,"Type":"Standard"}}};
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
    this.getAllsubWallet(id);

  }

  saveId(id){
    this.localStorage.saveCurMasterId({masterId:id}).then((data)=>{
      console.log("qiehuam========="+id);
      Config.setCurMasterWalletId(id);
      this.masterWalletId = Config.getCurMasterWalletId();
      this.navCtrl.pop();
      this.events.publish("wallte:update",id);
    });
  }

  nextPage(){
    this.native.Go(this.navCtrl,LauncherComponent);
  }

  registerWalletListener(masterId,coin){
    this.walletManager.registerWalletListener(masterId,coin,(data)=>{
          if(!Config.isResregister(masterId,coin)){
            Config.setResregister(masterId,coin,true);
          }
           this.events.publish("register:update",masterId,coin,data);
           //this.saveWalletList();
    });
  }

  getAllsubWallet(masterId){

        let chinas = Config.getSubWallet(masterId);
        for (let chain in chinas) {
          if(Config.isResregister(masterId,chain)){
            this.registerWalletListener(masterId,chain);
          }
        }
        this.saveId(masterId);
    }
 }
