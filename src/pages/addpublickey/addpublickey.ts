import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WalletManager} from '../../providers/WalletManager';
@Component({
  selector: 'page-addpublickey',
  templateUrl: 'addpublickey.html',
})
export class AddpublickeyPage {
  public  publicKey:string="";
  private msobj:any;
  public  publicKeyArr:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public walletManager:WalletManager) {
    console.log("=========AddpublickeyPage"+JSON.stringify(this.navParams.data));
    this.msobj = this.navParams.data;
    let totalCopayers = this.msobj["totalCopayers"];
    for(let index=0 ;index<totalCopayers;index++){
          let  item ={index:index,publicKey:""};
          this.publicKeyArr.push(item);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpublickeyPage');
  }

  nextPage(){
    console.log("========"+JSON.stringify(this.publicKeyArr));
  }

  createWallet(){
    let copayers = this.getTotalCopayers();
    this.walletManager.createMultiSignMasterWallet("1",copayers,this.msobj["requiredCopayers"],(data)=>{
              if(data['success']){
                console.log("=====createMultiSignMasterWalletWithPrivKey======"+JSON.stringify(data));
              }else{
                alert("==========")
              }
    });
   }

  getTotalCopayers(){
    let arr = [];
    for(let index = 0;index<this.publicKeyArr.length;index++){
          let item = this.publicKeyArr[index];
          arr.push(item["publicKey"]);
    }
    return JSON.stringify(arr);
  }

}
