import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Native} from "../../providers/Native";
import {TxdetailsPage} from '../../pages/txdetails/txdetails';
import {Util} from "../../providers/Util";
/**
 * Generated class for the TxtextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-txtext',
  templateUrl: 'txtext.html',
})
export class TxtextPage {
  public selectedTab:number = 3;
  public keyStoreContent:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public native: Native) {
         this.selectedTab = this.navParams.data["selectTab"];
         this.native.info(this.selectedTab);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TxtextPage');
  }

  onNext(){
    if(Util.isNull(this.keyStoreContent)){
      //this.native.hideLoading();
      this.native.toast_trans('import-text-keystroe-message1');
          return false;
    }
     this.native.info(this.keyStoreContent);
     this.native.info(typeof(this.keyStoreContent));
     let text = JSON.parse(this.keyStoreContent);
     this.native.info(JSON.stringify(text["text"]));
     let senddata1 = {"content":text["text"],type:this.selectedTab};
     this.native.info(JSON.stringify(senddata1));
     //Config.sendTxText = {};
     this.native.Go(this.navCtrl,TxdetailsPage,senddata1);//sendTx
  }

}
