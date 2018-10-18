
import {Injectable} from '@angular/core';
import { ToastController,LoadingController,App, Loading} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Clipboard } from '@ionic-native/clipboard';
import {TranslateService} from '@ngx-translate/core';
import {HttpService} from "../providers/HttpService";
/***
 * APP底层交互
 */
@Injectable()
export class Native {
  private loading: Loading;
  private loadingIsOpen: boolean = false;
  constructor(public toastCtrl:ToastController,
              private barcodeScanner: BarcodeScanner,
              private clipboard: Clipboard,
              public translate: TranslateService,
              public app:App,
              private loadingCtrl: LoadingController,
              public http: HttpService) {

  }



  public toast(_message: string = '操作完成', duration: number = 2000): void {
    //this.toast.show(message, String(duration), 'bottom').subscribe();
    this.toastCtrl.create({
      message: _message,
      duration: 2000,
      position: 'top'
    }).present();
  }

  public toast_trans(_message: string = '', duration: number = 2000): void {
    //this.toast.show(message, String(duration), 'bottom').subscribe();
    _message = this.translate.instant(_message);
    this.toastCtrl.create({
      message: _message,
      duration: 2000,
      position: 'top'
    }).present();
  }


  /***
   * 调用二维码扫描
   * @returns {{codeData: string}}
   */
  public scan() {
    return this.barcodeScanner.scan();
  }

  /**
   * 复制到剪贴板
   * @param options
   * @constructor
   */
  copyClipboard(text) {
    return this.clipboard.copy(text);
  }

  static getLanguage(){
    return "english";
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

    /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  public showLoading(content: string = ''): any {
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      return this.loading.present();
      // setTimeout(() => {//最长显示10秒
      //   this.loadingIsOpen && this.loading.dismiss();
      //   this.loadingIsOpen = false;
      // }, 20000);
    }
  };

  /**
   * 关闭loading
   */
  public hideLoading(): void {
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };

  public getHttp(){
    return this.http;
  }

  public getTimestamp(){
      return new Date().getTime().toString();
  }
}


