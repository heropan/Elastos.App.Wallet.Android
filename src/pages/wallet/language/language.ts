import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  public currentLanguage: any;
  public languages: any;
  constructor(
    private navCtrl: NavController,
    private translate: TranslateService
  ) {
      this.languages =[{
        name: 'English',
        isoCode: 'en'
      }, {
        name: '中文（简体）',
        isoCode: 'zh',
        useIdeograms: true,
      }]
  }



  public save(newLang: string): void {

         alert("newLang=="+newLang);
         this.translate.use(newLang);
         this.navCtrl.pop();
  }

}
