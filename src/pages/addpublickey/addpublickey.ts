import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WalletManager} from '../../providers/WalletManager';
@Component({
  selector: 'page-addpublickey',
  templateUrl: 'addpublickey.html',
})
export class AddpublickeyPage {
  public  publicKey1:string="xpub6DXoyYMMVE2snF2A51DfVrKikRqMbMmw6JQbS5wSHVVPj7SrBR3QHXeqjGU5rb1TA3hNE7SoJhdRGpRLJg2ntRiKJiRs37jnD2kPxScTzZB";
  public  publicKey2:string="xpub6DBsmXRSKmrkVEZ5kd25mq4mwGxSWr66QY9MajeSH5nSj2hHWVDYKgT1MMHehfMhVqsqwtmqs13qgzJC7SwWUKGmwJDESXM62QUaNCTJ4vP";
  private msobj:any;
  public  publicKeyArr:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public walletManager:WalletManager) {
    console.log("=========AddpublickeyPage"+JSON.stringify(this.navParams.data));
    this.msobj = this.navParams.data;
    let totalCopayers = this.msobj["totalCopayers"];
    for(let index=0 ;index<totalCopayers;index++){
          let  item = {};
          if(index === 0){
            item = {index:index,publicKey:this.publicKey1};
          }else if(index === 1){
            item = {index:index,publicKey:this.publicKey2};
          }
          this.publicKeyArr.push(item);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpublickeyPage');
  }

  nextPage(){
    console.log("========"+JSON.stringify(this.publicKeyArr));
    this.createWallet();
  }

  createWallet(){
    let copayers = this.getTotalCopayers();
    console.log("====mastId===="+"1"+"====copayers===="+copayers+"==requiredCopayers=="+this.msobj["requiredCopayers"]);
    this.walletManager.createMultiSignMasterWallet("1","",copayers,this.msobj["requiredCopayers"],(data)=>{
              if(data['success']){
                console.log("=====createMultiSignMasterWallet======"+JSON.stringify(data));
              }else{
                alert("=====createMultiSignMasterWallet===error=="+JSON.stringify(data));
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
