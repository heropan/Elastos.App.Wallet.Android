import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-scancode',
  templateUrl: 'scancode.html',
})
export class ScancodePage {
  public qrcode: string=null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
          //  this.qrcode = JSON.stringify({"txContent":{"masterWalletId":"DF2551","chianId":"ELA","address":"xxxxxxx","amount":"0.1","fee":"0.001","rawTransaction":{"Attributes":[{"Data":"353634383333303934","Usage":0}],"BlockHeight":2147483647,"Fee":10000,"Inputs":[{"Address":"8Gqrkk876Kc1HUjeG9evyFsc91RGYWyQj4","Amount":200000000,"Index":0,"Script":"76a914134a742f7782c295d3ea18cb59cd0101b21b1a2f88ac","Sequence":4294967295,"Signature":"","TxHash":"e77c3bea963d124311076d4737372cbb23aef8d63d5eadaad578455d481cc025"}],"IsRegistered":false,"LockTime":0,"Outputs":[{"Address":"Ed8ZSxSB98roeyuRZwwekrnRqcgnfiUDeQ","Amount":10000000,"AssetId":"b037db964a231458d2d6ffd5ea18944c4f90e63d547c5d3b9874df66a4ead0a3","OutputLock":0,"ProgramHash":"21db215de2758b7d743f66e4c66cfcc35dc54ccbcb","Script":"76a914db215de2758b7d743f66e4c66cfcc35dc54ccbcb88ac","ScriptLen":25,"SignType":172},{"Address":"8Gqrkk876Kc1HUjeG9evyFsc91RGYWyQj4","Amount":189990000,"AssetId":"b037db964a231458d2d6ffd5ea18944c4f90e63d547c5d3b9874df66a4ead0a3","OutputLock":0,"ProgramHash":"12134a742f7782c295d3ea18cb59cd0101b21b1a2f","Script":"76a914134a742f7782c295d3ea18cb59cd0101b21b1a2f88ac","ScriptLen":25,"SignType":174}],"PayLoad":null,"PayloadVersion":0,"Programs":[{"Code":"522103a9c882bfa948e149f8bdae864623de7750d00ca88e7c2845960274a772ac22cb2102f925e82f4482a9aa853a35203ab8965439c9db6aee8ef1783d2e1a491c28a48252ae","Parameter":"4053ac5d816c5a702a8e8cad451bfcfbd41e3a21ba610f84e147d8e72630501fe23195f1c647f64aefe507c21362ccd0526827fcf5c6f662e04f0aec3ca0f8bc12"}],"Remark":"","Timestamp":0,"TxHash":"80a0eb3c6bbce2c21d542c7ce9d248fe013fc1c757addd7fcee04b14098d5fa7","Type":2,"Version":1}}});
          //  this.qrcode = JSON.stringify({"txContent":{"masterWalletId":"DF2551","chianId":"ELA","address":"xxxxxxx","amount":"0.1","fee":"0.001","rawTransaction":{
          //   "Attributes": [{
          //     "Data": "353634383333303934",
          //     "Usage": 0
          //   }],
          //   "BlockHeight": 2147483647,
          //   "Fee": 10000,
          //   "Inputs": [{
          //     "Address": "8Gqrkk876Kc1HUjeG9evyFsc91RGYWyQj4",
          //     "Amount": 200000000,
          //     "Index": 0,
          //     "Script": "76a914134a742f7782c295d3ea18cb59cd0101b21b1a2f88ac",
          //     "Sequence": 4294967295,
          //     "Signature": "",
          //     "TxHash": "e77c3bea963d124311076d4737372cbb23aef8d63d5eadaad578455d481cc025"
          //   }],
          //   "IsRegistered": false,
          //   "LockTime": 0,
          //   "Outputs": [{
          //     "Address": "Ed8ZSxSB98roeyuRZwwekrnRqcgnfiUDeQ",
          //     "Amount": 10000000,
          //     "AssetId": "b037db964a231458d2d6ffd5ea18944c4f90e63d547c5d3b9874df66a4ead0a3",
          //     "OutputLock": 0,
          //     "ProgramHash": "21db215de2758b7d743f66e4c66cfcc35dc54ccbcb",
          //     "Script": "76a914db215de2758b7d743f66e4c66cfcc35dc54ccbcb88ac",
          //     "ScriptLen": 25,
          //     "SignType": 172
          //   }, {
          //     "Address": "8Gqrkk876Kc1HUjeG9evyFsc91RGYWyQj4",
          //     "Amount": 189990000,
          //     "AssetId": "b037db964a231458d2d6ffd5ea18944c4f90e63d547c5d3b9874df66a4ead0a3",
          //     "OutputLock": 0,
          //     "ProgramHash": "12134a742f7782c295d3ea18cb59cd0101b21b1a2f",
          //     "Script": "76a914134a742f7782c295d3ea18cb59cd0101b21b1a2f88ac",
          //     "ScriptLen": 25,
          //     "SignType": 174
          //   }],
          //   "PayLoad": null,
          //   "PayloadVersion": 0,
          //   "Programs": [{
          //     "Code": "522103a9c882bfa948e149f8bdae864623de7750d00ca88e7c2845960274a772ac22cb2102f925e82f4482a9aa853a35203ab8965439c9db6aee8ef1783d2e1a491c28a48252ae",
          //     "Parameter": "4053ac5d816c5a702a8e8cad451bfcfbd41e3a21ba610f84e147d8e72630501fe23195f1c647f64aefe507c21362ccd0526827fcf5c6f662e04f0aec3ca0f8bc1240cf6018d47414e9997d29cf3944318a10f1c738b20c3d758df1962fed845911ba8d6fd80ed91bd0ca8901bcac51fa9a5f3ded707aa496de2e7c14d9c283019f5b"
          //   }],
          //   "Remark": "",
          //   "Timestamp": 0,
          //   "TxHash": "80a0eb3c6bbce2c21d542c7ce9d248fe013fc1c757addd7fcee04b14098d5fa7",
          //   "Type": 2,
          //   "Version": 1
          // }}})
           this.qrcode = JSON.stringify(this.navParams.data);
           console.log("=====this.qrcode====="+this.qrcode);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScancodePage');
  }

}
