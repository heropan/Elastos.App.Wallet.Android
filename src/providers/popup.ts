import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class PopupProvider {
  constructor(
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {
  }

  public ionicAlert(title: string, subTitle?: string, okText?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title : this.translate.instant(title),
        subTitle : this.translate.instant(subTitle),
        enableBackdropDismiss: false,
        buttons: [
          {
            text: okText ? okText : this.translate.instant('confirm'),
            handler: () => {
              console.log('Ok clicked');
              resolve();
            }
          }
        ]
      });
      alert.present();
    });
  };

  public ionicConfirm(title: string, message: string, okText?: string, cancelText?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title : this.translate.instant(title),
        message  : this.translate.instant(message),
        buttons: [
          {
            text: cancelText ? cancelText : this.translate.instant('cancel'),
            handler: () => {
              console.log('Disagree clicked');
              resolve(false);
            }
          },
          {
            text: okText ? okText : this.translate.instant('confirm'),
            handler: () => {
              console.log('Agree clicked');
              resolve(true);
            }
          }
        ]
      });
      confirm.present();
    });
  };

  public ionicPrompt(title: string, message: string, opts?: any, okText?: string, cancelText?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let defaultText = opts && opts.defaultText ? opts.defaultText : null;
      let placeholder = opts && opts.placeholder ? opts.placeholder : null;
      let inputType = opts && opts.type ? opts.type : 'text';
      let cssClass = opts.useDanger ? "alertDanger" : null;
      let enableBackdropDismiss = !!opts.enableBackdropDismiss;

      let prompt = this.alertCtrl.create({
        title,
        message,
        cssClass,
        enableBackdropDismiss,
        inputs: [
          {
            value: defaultText,
            placeholder,
            type: inputType
          },
        ],
        buttons: [
          {
            text: cancelText ? cancelText : this.translate.instant('Cancel'),
            handler: data => {
              console.log('Cancel clicked');
              resolve(null);
            }
          },
          {
            text: okText ? okText : this.translate.instant('Ok'),
            handler: data => {
              console.log('Saved clicked');
              resolve(data[0]);
            }
          }
        ]
      });
      prompt.present();
    });
  }
}
