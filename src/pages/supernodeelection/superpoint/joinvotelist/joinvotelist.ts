import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {Native} from "../../../../providers/Native";
import {ApiUrl} from "../../../../providers/ApiUrl";
/**
 * Generated class for the JoinvotelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-joinvotelist',
  templateUrl: 'joinvotelist.html',
})
export class JoinvotelistPage {

  public nodelist = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public native: Native) {
      this.init();
  }


  init(){
    this.getVoteList();
  }
  ionViewDidLoad() {

  }

  votingRules(){
      this.openPayModal();
  }

  myvote(){
    this.native.Go(this.navCtrl,'MyvotePage');
  }

  tovote(){
    this.native.Go(this.navCtrl,'PointvotePage');
  }

  openPayModal(){
    const modal = this.modalCtrl.create("VotingrulesPage",{});
    modal.onDidDismiss(data => {
      if(data){
      }
    });
    modal.present();
  }

  jumpNodeInformation(status){
    console.log("===jumpNodeInformation==="+status);
    this.native.Go(this.navCtrl,'NodeinformationPage',{"status":status});
  }


  getVoteList(){
    this.native.getHttp().postByAuth(ApiUrl.listproducer).toPromise().then(data=>{
           if(data["status"] === 200){
               console.log("========parm"+JSON.stringify(data));
               let votesResult = JSON.parse(data["_body"]);
               this.nodelist = votesResult["data"]["result"]["producers"] || [];
             }
    });
  }

}
