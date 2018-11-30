import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams } from 'ionic-angular';
import {Native} from "../../../../providers/Native";
import {Util} from '../../../../providers/Util'

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointvotePage');
  }

  vote(){
     if(this.selectNum>0){
      this.openPayModal();
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
      }
    });
    modal.present();
  }

}
