
import {Injectable} from '@angular/core';
import { ToastController,App} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FileChooser } from '@ionic-native/file-chooser';
import { Clipboard } from '@ionic-native/clipboard';
import { UUID } from 'angular2-uuid';
import {TranslateService} from '@ngx-translate/core';
/***
 * APP底层交互
 */
@Injectable()
export class Native {

  constructor(public toastCtrl:ToastController,
              private barcodeScanner: BarcodeScanner,
              private fileChooser: FileChooser,
              private clipboard: Clipboard,
              public translate: TranslateService,
              public app:App) {

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


  toast(_message: string = '操作完成', duration: number = 2000): void {
    //this.toast.show(message, String(duration), 'bottom').subscribe();
    this.toastCtrl.create({
      message: _message,
      duration: 2000,
      position: 'top'
    }).present();
  }

  toast_trans(_message: string = '', duration: number = 2000): void {
    //this.toast.show(message, String(duration), 'bottom').subscribe();
    _message = this.translate.instant(_message);
    this.toastCtrl.create({
      message: _message,
      duration: 2000,
      position: 'top'
    }).present();
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
    return this.clipboard.copy(text);
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

    /**
   * 创建ID
   */
  public static createId(){
    let id = UUID.UUID();
    let backParms={"id":id,"priKey":'1111111'};
    return backParms;
  }
  /**
   * 调用钱包
   * @param amount
   */
  public static payMoney(amount){
       return ;
  }

  public Go(navCtrl:any,page: any, options: any = {}) {
        navCtrl.push(page, options);
  }

  public setRootRouter(router){
    this.app.getRootNav().setRoot(router);
  }

  public getMnemonicLang(): string {
    return "english";
  }

  public clone(myObj){
    if(typeof(myObj) != 'object') return myObj;
    if(myObj == null) return myObj;

    let myNewObj;

    if(myObj instanceof(Array)){
      myNewObj= new Array();
    }else{
      myNewObj= new Object();
    }

    for(let i in myObj)
      myNewObj[i] = this.clone(myObj[i]);

    return myNewObj;
  }
}


