import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams } from 'ionic-angular';
import {Native} from "../../../../providers/Native";
import {Util} from '../../../../providers/Util';
import { PopupProvider } from '../../../../providers/popup';

/**
 * Generated class for the PointvotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pointvote',
  templateUrl: 'pointvote.html',
})
export class PointvotePage {
  public voteList = [{"id":"1"},{"id":"2"},{"id":"3"},{"id":"4"},{"id":"5"},{"id":"6"},{"id":"7"}];
  public selectNum:number = 0;
  public idChainPer = "100";
  public selectVoteObj = {};
  public isAllchecked = false;
  public selectNode = [];
  public passworld:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public native: Native,public popupProvider
    :PopupProvider) {
              this.selectNode = this.navParams.data["selectNode"] || [];
              this.setSelectArr(this.selectNode);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointvotePage');
  }

  vote(){
     if(this.selectNum>0){
      this.openPayModal();
     }else{
       this.native.toast_trans("please-select-voting-node");
     }
  }

  setSelectAll(){
    console.log('================='+this.isAllchecked);
    for(let index in this.voteList){
         let id = this.voteList[index]["id"];
         this.selectVoteObj[id] = this.isAllchecked;
    }

    this.selectNum = this.getSelectNum();
    console.log(JSON.stringify(this.selectVoteObj));
  }

  getSelectNum(){
     let index = 0;
     for(let key in this.selectVoteObj){
        console.log("=========="+key);
        if(this.selectVoteObj[key]){
          index++;
        }
     }
     return index;
  }

  setSelect(ischecked,id){
    this.selectVoteObj[id] = ischecked;
    this.selectNum = this.getSelectNum();

    if(this.selectNum>0){
       this.isAllchecked = true;
    }else{
        this.isAllchecked = false;
    }
  }

  openPayModal(){
    const modal = this.modalCtrl.create("InputticketsPage",{});
    modal.onDidDismiss(data => {
      if(data){
         console.log("sssss"+JSON.stringify(data));
         this.popupProvider.presentPrompt().then((val)=>{
          if(Util.isNull(val)){
            this.native.toast_trans("text-id-kyc-prompt-password");
            return;
          }
          this.passworld = val.toString();
          //this.native.Go(this.navCtrl,'JoinvotelistPage');
}).catch(()=>{

});
      }
    });
    modal.present();
  }

  setSelectArr(arr){
     for(let index = 0;index<arr.length;index++){
      let id = arr[index];
      this.selectVoteObj[id] = true;
     }
  }

}
