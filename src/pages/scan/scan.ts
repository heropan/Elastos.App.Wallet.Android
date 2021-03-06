import { Component } from '@angular/core';
import { NavController, NavParams , ViewController,Events} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {TxdetailsPage} from '../../pages/txdetails/txdetails';
import {Native} from "../../providers/Native";
import {Config} from "../../providers/Config";

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  light: boolean;//判断闪光灯
  frontCamera: boolean;//判断摄像头
  isShow: boolean = false;//控制显示背景，避免切换页面卡顿
  pageType:string;
  constructor( private navCtrl: NavController, private navParams: NavParams, private qrScanner: QRScanner, private viewCtrl: ViewController,public events :Events,public native :Native) {
      //默认为false
      this.light = false;
      this.frontCamera = false;
      this.pageType = this.navParams.get("pageType");
  }


  ionViewDidLoad() {
    this.qrScanner.prepare() .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) =>
           {
             switch(this.pageType){
                case "1":
                   let toaddress = "";
                  if(text.indexOf('elastos') != -1) {
                    toaddress = text.split(":")[1];
                   }else{
                    toaddress = text.split(":")[0];
                   }
                  this.events.publish("address:update",toaddress);
                  this.hideCamera();
                  // stop scanning
                  this.navCtrl.pop();
                  break;
               case "3":
                 this.hideCamera();
                 this.navCtrl.pop();
                 text =JSON.parse(text);
                 let MaxNumber = text["totalNum"];
                 let curNumber = text["curNum"];
                 if(!Config.singTxText[curNumber]){
                  Config.singTxCount++;
                  Config.singTxText[curNumber] = text["text"];
                 }
                 if(Config.singTxCount==MaxNumber){
                        Config.singTxCount = 0;
                  let senddata = {"content":this.autoSplicing(Config.singTxText),type:4};
                  Config.singTxText = {};
                  this.native.Go(this.navCtrl,TxdetailsPage,senddata);//singTx
                 }
                   break;
               case "4":
                this.hideCamera();
                this.navCtrl.pop();
                text =JSON.parse(text);
                let MaxNum = text["totalNum"];
                let curNum = text["curNum"];
                if(!Config.sendTxText[curNum]){
                  Config.sendTxCount++;
                 Config.sendTxText[curNum] = text["text"];
                }
                if(Config.sendTxCount == MaxNum){
                  Config.sendTxCount = 0;
                  let senddata1 = {"content":this.autoSplicing(Config.sendTxText),type:3};
                  Config.sendTxText = {};
                  this.native.Go(this.navCtrl,TxdetailsPage,senddata1);//sendTx
                }
                   break;
               case "5":
               this.events.publish("publickey:update",text);
               this.hideCamera();
               // stop scanning
               this.navCtrl.pop();
                  break;
               case "6":
                  this.events.publish("privatekey:update",text);
                  this.hideCamera();
                  // stop scanning
                  this.navCtrl.pop();
                     break;
             }

            });
             // show camera preview
             this.qrScanner.show();
             // wait for user to scan something,then the observable callback will be called
            } else if (status.denied) {
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
              } else {
                // permission was denied, but not permanently. You can ask for permission again at a later time.
              }}).catch((e: any) => console.log('Error is', e));
             }

             ionViewDidEnter(){
              //页面可见时才执行
              this.showCamera();
              this.isShow = true;//显示背景
            }

             /** * 闪光灯控制，默认关闭 */
             toggleLight() {
               if (this.light)
               { this.qrScanner.disableLight();
               } else {
                  this.qrScanner.enableLight();
                  }
              this.light = !this.light;
             }

              /** * 前后摄像头互换 */
              toggleCamera() {
                if(this.frontCamera)
                { this.qrScanner.useBackCamera(); }
                else { this.qrScanner.useFrontCamera();
                }
                this.frontCamera = !this.frontCamera;
              }

              showCamera() {
                (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
              }

              hideCamera() {
                (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
                 this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
                 this.qrScanner.destroy();//关闭
              }

              ionViewWillLeave() {
                this.hideCamera();
              }


              autoSplicing(obj){
                let text ="";
                for(var key in obj){
                  text = text+obj[key];
                }
                return text;
              }


}
