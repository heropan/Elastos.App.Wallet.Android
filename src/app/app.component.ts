import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LauncherComponent } from "../pages/launcher/launcher.component";
//import {Utils} from "../providers/Utils";
//import {WalletCreateComponent} from "../pages/wallet/wallet-create/wallet-create.component";
import { MnemonicComponent } from "../pages/mnemonic/mnemonic.component";
//import {WriteComponent} from "../pages/mnemonic/write/write.component";
import { ImportComponent } from "../pages/wallet/import/import.component";
import { ExprotPrikeyComponent } from "../pages/wallet/exprot-prikey/exprot-prikey.component";
//import {ReceiveComponent} from "../pages/coin/receive/receive.component";
import { TransferComponent } from "../pages/coin/transfer/transfer.component";
import {CoinComponent} from "../pages/coin/coin.component";
import { CoinListComponent } from "../pages/coin/coin-list/coin-list.component";
import {RecordinfoComponent} from "../pages/coin/recordinfo/recordinfo.component";
//import {RecordComponent} from "../pages/coin/record/record.component";
import { TestJniComponent } from '../pages/testjni/testjni.component';
//import { AddressComponent } from '../pages/wallet/address/address.component'
import { TabsComponent } from '../pages/tabs/tabs.component';
import { WalltelistPage } from '../pages/walltelist/walltelist';
import { ImportprivatekeyPage } from '../pages/importprivatekey/importprivatekey';
import { LocalStorage } from "../providers/Localstorage";
import { PaymentConfirmComponent } from "../pages/coin/payment-confirm/payment-confirm.component";
import { DidLoginComponent } from "../pages/third-party/did-login/did-login.component";
import { ManagerComponent } from "../pages/wallet/manager/manager.component"
import { Config } from '../providers/Config';
import { TranslateService } from '@ngx-translate/core';
import { Native } from '../providers/Native';
//import { WalletManager } from '../providers/WalletManager';
import { PaypasswordResetComponent } from "../pages/wallet/paypassword-reset/paypassword-reset.component";
import { MyComponent } from '../pages/tabs/my/my.component';
import { WalletCreateComponent } from '../pages/wallet/wallet-create/wallet-create.component';
import { ContactsComponent } from '../pages/contacts/contacts.component';
import { ContactCreateComponent } from '../pages/contacts/contact-create/contact-create.component';
import { ContactListComponent } from '../pages/contacts/contact-list/contact-list.component';
import { CoinlistpasswordPage } from '../pages/coinlistpassword/coinlistpassword';
import { TxdetailsPage } from '../pages/txdetails/txdetails';
import { WalltemodePage } from '../pages/walltemode/walltemode';
import { ScancodePage } from '../pages/scancode/scancode';
import { InitializepagePage } from "../pages/initializepage/initializepage";
import {PaymentboxPage} from '../pages/paymentbox/paymentbox';
import { CoinSelectComponent } from "../pages/coin/coin-select/coin-select.component";

//add for plugin
declare var cordova: any;

@Component({
  selector: 'app',
  templateUrl: 'app.html',
})


export class AppComponent {
  rootPage: any;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  constructor(public appCtrl: App, private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public localStorage: LocalStorage, private translate: TranslateService, private native: Native) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.registerBackButtonAction();
      this.initTranslateConfig();
      this.initJsPush();
      this.getKycIdList();

      this.localStorage.getMappingTable().then((data)=>{
         console.log("===getMappingTable===="+data);
         if(data){
           Config.setMappingList(JSON.parse(data));
          }
          this.rootPage = InitializepagePage;
      });

      //this.rootPage = PaymentboxPage
      //this.initializeApp();
      //this.rootPage =  WalltelistPage;
      //this.rootPage = ImportprivatekeyPage;
      //this.rootPage =  TabsComponent;
      //this.rootPage =  LauncherComponent;
      //this.rootPage =  ManagerComponent;
      //this.rootPage = ExprotPrikeyComponent;
      //this.rootPage = MyComponent;
      // this.rootPage = WalletCreateComponent;
      //this.rootPage = TestJniComponent;
      //this.rootPage = MnemonicComponent;
      //this.rootPage = ImportComponent;
      //this.rootPage = ContactCreateComponent;
      //this.rootPage = ContactListComponent;
      //this.rootPage = CoinListComponent;
      //this.rootPage = TxdetailsPage;
      //this.rootPage = WalltemodePage;
      //this.rootPage = ScancodePage;
      //this.rootPage = InitializepagePage;
      //this.rootPage = RecordinfoComponent;
      //this.rootPage = CoinComponent;
      //this.rootPage = CoinSelectComponent;
      //init java 2 js plugin
    });


  }

  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
  }
  //
  onReceiveJG(param) {
    let serialNum = JSON.parse(param)["serialNum"];
    let message1 = this.translate.instant("text-Jpush-kyc-message-1");
    let message2 = this.translate.instant("text-Jpush-kyc-message-2");
    alert(message1 + serialNum + message2);
    //  let serialNum = JSON.parse(param)["serialNum"];
    //  let serids = Config.getSerIds();
    //  let serid = serids[serialNum];
    //  let did = serid["id"];
    //  let appName = serid["appName"];
    //  let appr = serid["appr"];
    //  let idsObj = {};
    //  this.ls.getKycList("kycId").then((val)=>{
    //      if(val == null || val === undefined || val === {} || val === ''){
    //           return;
    //      }
    //   idsObj = JSON.parse(val);
    //   idsObj[did][appName][appr]["order"][serialNum]["status"] = 1;
    //   this.ls.set("kycId",idsObj).then(()=>{

    //   });
    //  });
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      this.showExit();
      // let activeNav = this.appCtrl.getActiveNavs()[0];
      // if(activeNav.canGoBack()){
      //     activeNav.pop();
      //  }else{
      //     this.showExit();
      //  }
      // let activePortal = this.ionicApp._modalPortal.getActive();
      // console.log("---activePortal---"+JSON.stringify(activePortal));
      // if (activePortal) {
      //   activePortal.dismiss().catch(() => {
      //   });
      //   activePortal.onDidDismiss(() => {
      //   });
      //   return;
      // }
      // console.log("---activeVC---"+JSON.stringify(this.nav.getActive()));
      //let activeVC = this.nav.getActive();
      // if (Util.isEmptyObject(activeVC.instance.tabs)) {
      //   this.showExit();
      // } else {
      //   let tabs = activeVC.instance.tabs;
      //   let activeNav = tabs.getSelected();
      //   return activeNav.canGoBack() ? activeNav.pop() : this.showExit();//另外两种方法在这里将this.showExit()改为其他两种的方法的逻辑就好。
      // }
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      let exitmesage = this.translate.instant("text-exit-message");
      this.native.toast(exitmesage);
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

  initTranslateConfig() {
    this.translate.addLangs(["zh", "en"]);

    this.localStorage.getLanguage("wallte-language").then((val) => {
      if (val == null) {
        this.localStorage.set("wallte-language", {
          name: '中文（简体）',
          isoCode: 'zh'
        }).then(() => {
          // 设置默认语言
          this.translate.setDefaultLang('zh');
          this.translate.use('zh');
        });
      } else {
        let lang = JSON.parse(val)["isoCode"];
        this.translate.use(lang);
      }
    })

  }

  initJsPush(){
    cordova.plugins.Java2JSBridge.init(this);
    cordova.plugins.Java2JSBridge.getRegistrationID(succeedCallback);
    function succeedCallback(message) {
      Config.setDeviceID(message);
    }
  }

  getKycIdList(){
    this.localStorage.getKycList("kycId").then((val) => {

      if (val == null || val === undefined || val === {} || val === '') {
        return;
      }
      let serids = Config.getSertoId(JSON.parse(val));
      Config.setSerIds(serids);
    });
  }

}


