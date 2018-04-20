import {Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouterUtil} from '../providers/RouterUtil';
import {Logger} from '../providers/Logger';
import {Location} from '@angular/common';
import {Config} from '../providers/Config';
import {TranslateService} from '@ngx-translate/core';
import {HeaderComponent, Header} from './header/app.header';
import {AppComponent} from './app.component';


@Component({
  selector: 'app-base',
  template: '',
})
export class BaseComponent {


  header: Header;

  public constructor(public router: RouterUtil,
                     public log: Logger,
                     public activateRoute: ActivatedRoute,
                     public config: Config,
                     public translate: TranslateService,
                     public location: Location,
                     public changeDetectorRef: ChangeDetectorRef) {
    this.translate.addLangs(['zh', 'en']);
    this.translate.setDefaultLang('zh');

    const broswerLang = this.translate.getBrowserLang();
    this.translate.use(broswerLang.match(/en|zh/) ? broswerLang : 'zh');

    this.header = new Header(location, 'app');
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
