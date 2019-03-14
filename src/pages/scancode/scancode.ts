import { Component,NgZone} from '@angular/core';
import { NavController, NavParams,Platform} from 'ionic-angular';
import {Native} from "../../providers/Native";
import {WalletManager} from '../../providers/WalletManager'
import { Config } from '../../providers/Config';

@Component({
  selector: 'page-scancode',
  templateUrl: 'scancode.html',
})
export class ScancodePage {
  public qrcode: string=null;
  public txHash:string ="";
  public toAddress:string="";
  public fee:any;
  public amount:any;
  public iwidth:string=null;
  public sHeight:string = null;
  public qrcodeArr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public native: Native,public walletManager: WalletManager,public zone:NgZone,public plt:Platform) {
           this.iwidth = (this.plt.width()-10).toString();
           this.sHeight = (this.plt.width()+30).toString();
           let params = this.navParams.data;
          this.qrcodeArr = this.fixedLengthFormatString(JSON.stringify(params),1000);
           this.native.info(this.qrcodeArr);
           this.fee = params["tx"]["fee"];
          let  txObj  = params["tx"]["raw"];
           this.walletManager.decodeTransactionFromString(txObj,(raw)=>{
            if(raw["success"]){
                this.native.info(raw);
                this.txHash = JSON.parse(raw["success"])["TxHash"];
                this.toAddress =JSON.parse(raw["success"])["Outputs"][0]["Address"];
                this.amount = JSON.parse(raw["success"])["Outputs"][0]["Amount"]/Config.SELA;
            }
         });
           this.zone.run(()=>{
            this.qrcode = JSON.stringify(params);
           });
           this.native.info(this.navParams.data);
  }

  ionViewDidLoad() {

  }


  fixedLengthFormatString(str,num){
    if(str == null || str == undefined) return null;
    if(!(/^[0-9]*[1-9][0-9]*$/.test(num))) return null;
    var array = new Array();
    let len = str.length;
    for(var i=0;i<(len/num);i++){
    	if((i+1)*num > len){
    	let totalNum = parseInt((len/num).toString())+1;
    	let curNum = i+1;
	    array.push({"totalNum":totalNum,"curNum":curNum,"text":str.substring(i*num,len)});
	}else{
	  let totalNum = parseInt((len/num).toString())+1;
		let curNum = i+1;
	    array.push({"totalNum":totalNum,"curNum":curNum,"text":str.substring(i*num,(i+1)*num)});
	}
    }
    return array;
}


    objtoString(item){
        return JSON.stringify(item);
    }

}
