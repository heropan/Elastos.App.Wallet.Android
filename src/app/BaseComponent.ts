import {Component, ChangeDetectorRef, ViewChild, ViewEncapsulation} from '@angular/core';
// import {StorageUtil} from '../providers/StorageUtil';
import {WalletManager} from '../providers/WalletManager';
import {Logger} from '../providers/Logger';
import {Location} from '@angular/common';
//import {Config} from '../providers/Config';
import {TranslateService} from '@ngx-translate/core';
import {Header} from './header/app.header';
//import {AppComponent} from './app.component';
import {Utils} from '../providers/Utils';
import {NavController} from 'ionic-angular';
import {Native} from "../providers/Native";
import {DialogService, ToastService} from 'ngx-weui';

import {zh} from "../assets/i18n/zh";
import {WalletModel} from "../models/wallet.model";
import {LocalStorage} from "../providers/Localstorage";
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'app-base',
  template: '',
  encapsulation: ViewEncapsulation.None

})
export class BaseComponent {


  header: Header;

  public walletData: WalletModel;


  public constructor(public log: Logger,
                     public translate: TranslateService,
                     public location: Location,
                     public changeDetectorRef: ChangeDetectorRef,
                     public localStorage: LocalStorage,
                     public native: Native,
                     @ViewChild('myNav') public nav: NavController,
                     public dialogService: DialogService,
                     public walletManager: WalletManager,
                     public navParams: NavParams,
                     public toastService: ToastService) {
    this.translate.addLangs(['zh', 'en']);
    this.translate.setDefaultLang('zh');
    const broswerLang = this.translate.getBrowserLang();
    this.translate.use(broswerLang.match(/en|zh/) ? broswerLang : 'zh');

    this.header = new Header(location, '');
    this.header.backClick = () => {
      this.Back();
    };

    // this.storage.getWallet((data) => {
    //   this.walletData = data;
    //   Logger.info(this.walletData);
    //   this.onWalletDatainit();
    // });
  }


  onWalletDatainit(){

  }

  /***
   * 路由跳转
   * @param {string} path
   * @param options 参数 ?key=value
   * @param id      id   /:id
   * @constructor
   */
  Go(page: any, options: any = {}) {
    this.nav.push(page, options);
    //this.router.navigate([path, id], {queryParams: options});
  }

  Back() {
    this.nav.pop();
  }

  /**强制刷新页面*/
  public updateValue() {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  /**设置当前标题*/
  public setTitle(title) {
    this.header.setTile(title);
    /// this.child.changeHeader();
  }

  /**设置标题-通过国际化文件*/
  public setTitleByAssets(key) {
    this.getText(key).subscribe((title) => {
      this.header.setTile(title);
    });

  }

  /***
   * 设置标题栏  替换为自己的参数对象
   * @param {Header} head
   */
  public setHeader(head: Header) {
    this.header = head;
  }

  /***
   * 设置右侧按钮
   * @param {string} rightIcon
   * @param rightClick
   */
  public setRightIcon(rightIcon: string, rightClick: any) {
    this.header.rightIcon = rightIcon;
    this.header.rightClick = rightClick;
  }

  /***
   * 设置左侧按钮
   * @param {string} leftIcon
   * @param leftClick
   */
  public setLeftIcon(leftIcon: string, leftClick: any) {
    this.header.backIcon = leftIcon;
    this.header.backClick = leftClick;
  }

  /***
   * 设置标题内容显示状态
   * @param display
   * {  左右图标和标题的显示状态
   *    left:boolean,
   *    title:boolean,
   *    right:boolean
   * }
   */
  public setHeadDisPlay(display: any) {
    this.header.display = {
      left: Utils.isNull(display.left) ? this.header.display.left : display.left,
      title: Utils.isNull(display.title) ? this.header.display.title : display.title,
      right: Utils.isNull(display.right) ? this.header.display.right : display.right
    };
  }

  public getText(key) {
    return this.translate.get(key);
  }

  public getLanguageInstance() {
    return zh;
  }

  /**改变当前语言*/
  changeLang(lang) {
    console.log(lang);
    this.translate.use(lang);
  }

  /**获取当前语言*/
  getLang() {
    console.log(this.translate.getBrowserLang());
    console.log(this.translate.getBrowserCultureLang());
  }

  // /**获取参数id*/
  // public getId() {
  //   return this.activateRoute.snapshot.params['id'];
  // }

  public checkNull(text) {
    return text == null || text === undefined || text === {} || text === '';
  }

  public messageBox(key){    
    this.getText(key).subscribe((msg) => {          
      alert(msg);     
    });  
  }

  public isNull(data): boolean {    
    return (data === '' || data === undefined || data === null) ? true : false;  
  }

  public isEmptyObject(obj): boolean {    
    for (let key of obj ) {      
      if(obj.hasOwnProperty(key)){        
        return false;      
      }    
    }    
    return true;  
  }

  public checkCellphone(cellphone: string): boolean {  
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(cellphone))){     
      return true;    
    }     
    return false;  
  }

  public objtoarr(obj){    
    console.log(JSON.stringify(obj["__zone_symbol__value"]));
    let arr = [];
    for (let key in obj) {
      arr.push(obj[key]);       
    }
    return arr;
  }

  public getNavParams(){    
    return this.navParams;  
  }

  public toast(res) {
    this.getText(res).subscribe((text) => {
      this.native.toast(text);
    });
  }
}
