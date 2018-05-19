import {Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouterUtil} from '../providers/RouterUtil';
import {StorageUtil} from '../providers/StorageUtil';
import {WalletManager} from '../providers/WalletManager';
import {Logger} from '../providers/Logger';
import {Location} from '@angular/common';
import {Config} from '../providers/Config';
import {TranslateService} from '@ngx-translate/core';
import {HeaderComponent, Header} from './header/app.header';
import {AppComponent} from './app.component';
import {Utils} from '../providers/Utils';



@Component({
  selector: 'app-base',
  template: '',
})
export class BaseComponent {


  header: Header;

  public static walletData;

  public constructor(public router: RouterUtil,
                     public log: Logger,
                     public activateRoute: ActivatedRoute,
                     public translate: TranslateService,
                     public location: Location,
                     public changeDetectorRef: ChangeDetectorRef,
                     public storage:StorageUtil,
                     public walletManager:WalletManager) {
    this.translate.addLangs(['zh', 'en']);
    this.translate.setDefaultLang('zh');

    const broswerLang = this.translate.getBrowserLang();
    this.translate.use(broswerLang.match(/en|zh/) ? broswerLang : 'zh');

    this.header = new Header(location, '');
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

  /**获取参数id*/
  public getId() {
    return this.activateRoute.snapshot.params['id'];
  }


  public checkNull(text) {
    return text == null || text === undefined || text === {} || text === '';
  }

}
