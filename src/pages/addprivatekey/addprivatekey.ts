import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WalletManager} from '../../providers/WalletManager';
@Component({
  selector: 'page-addprivatekey',
  templateUrl: 'addprivatekey.html',
})
export class AddprivatekeyPage {
  public  publicKey:string="xpub6DXoyYMMVE2snF2A51DfVrKikRqMbMmw6JQbS5wSHVVPj7SrBR3QHXeqjGU5rb1TA3hNE7SoJhdRGpRLJg2ntRiKJiRs37jnD2kPxScTzZB";
  private msobj:any;
  public  publicKeyArr:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public walletManager: WalletManager) {
    console.log("=========AddpublickeyPage"+JSON.stringify(this.navParams.data));
    this.msobj = this.navParams.data;
    let totalCopayers = this.msobj["totalCopayers"];
    for(let index=0 ;index<totalCopayers-1;index++){
        let item ={index:index,publicKey:this.publicKey};
        this.publicKeyArr.push(item);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprivatekeyPage');
  }

  nextPage(){
     //this.navCtrl.push(AddpublickeyPage);
     this.createWallet();
  }

  createWallet(){
     let copayers = this.getTotalCopayers();
     console.log("====mastId===="+"1"+"====importText===="+this.msobj["importText"]+"====passWord===="+this.msobj["passWord"]+"====copayers===="+copayers+"==requiredCopayers=="+this.msobj["requiredCopayers"]);
     this.walletManager.createMultiSignMasterWalletWithPrivKey("1",this.msobj["importText"],this.msobj["passWord"],copayers,this.msobj["requiredCopayers"],(data)=>{
               if(data['success']){
                 console.log("=====createMultiSignMasterWalletWithPrivKey======"+JSON.stringify(data));
               }else{
                 alert("=====createMultiSignMasterWalletWithPrivKey===error==="+JSON.stringify(data));
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
