import {Injectable} from '@angular/core';
import { ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import {browserDetection} from "@angular/platform-browser/testing/src/browser_util";
import { FileChooser } from '@ionic-native/file-chooser';
import { Clipboard } from '@ionic-native/clipboard';
import { ToptipsService } from "ngx-weui";


/***
 * APP底层交互
 */
@Injectable()
export class Native {

  constructor(public toastCtrl:ToastController,
              private barcodeScanner: BarcodeScanner,
              private fileChooser: FileChooser,
              private clipboard: Clipboard,
              private toastWeixin: ToptipsService) {

  }

  /**
   * 获取设备信息
   * @returns {{platform: string; model: string; version: number; uuid: string; ua: string}}
   */
  getDeviceInfo() {
    return {
      platform: 'Android',
      model: '5s',
      version: 6.0,
      uuid: '15165165',
      ua: 'webkit'
    };
  }

  //
  // toast(text){
  //   let t = this.toastCtrl.create({
  //     message: text,
  //     duration: 3000
  //   });
  //   t.present();
  // }

  toast(text:string,type: 'warn' | 'info' | 'primary' | 'success' | 'default' = 'info'){
    this.toastWeixin[type](text);
  }



  /***
   * 获取网络状态
   * @returns {{ConnectionType: string}}
   */
  getNetWorkInfo() {
    return {
      ConnectionType: 'wifi'
    };
  }

  /***
   * 调用二维码扫描
   * @returns {{codeData: string}}
   */
  scan() {
    return this.barcodeScanner.scan();
    // this.barcodeScanner.scan().then(barcodeData => {
    //   Fun(browserDetection);
    // }).catch(err => {
    //    errorFun(err);
    // });
    // return {
    //   codeData: 'EehM1A6MnVZxs6qH8AEA1pSLeW4RxmqhuU'
    // };
  }

  /***
   * 打开文件
   * @returns {{file: {}; path: string; fileType: string}}
   */
  openFile() {
    return this.fileChooser.open();
    // return {
    //   file: {},
    //   path: 'xxx',
    //   fileType: 'jpg'
    // };
  }

  /**
   * 打开私钥
   * @returns {{}}
   */
  openPrikey() {
    return {};
  }

  /***
   * 导出文件
   * @param json
   */
  exportFile(json) {

  }

  /**
   * 复制到剪贴板
   * @param options
   * @constructor
   */
  copyClipboard(text) {
    this.clipboard.copy(text);
  }

  /**
   * 粘贴剪切板
   * @returns {string}
   * @constructor
   */
  pasteClipboard() {
    return 'xxxxxx';
  }

  /**
   * 配置跨域
   */
  crossDomain() {

  }

  /**
   * kyc 认证
   * @param options
   */
  key(options) {

  }

  static getLanguage(){
    return "english";
  }
}


