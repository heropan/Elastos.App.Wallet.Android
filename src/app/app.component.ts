import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LauncherComponent} from "../pages/launcher/launcher.component";
//import {Utils} from "../providers/Utils";
//import {WalletCreateComponent} from "../pages/wallet/wallet-create/wallet-create.component";
//import {MnemonicComponent} from "../pages/mnemonic/mnemonic.component";
//import {WriteComponent} from "../pages/mnemonic/write/write.component";
//import {ImportComponent} from "../pages/wallet/import/import.component";
//import {ExprotPrikeyComponent} from "../pages/wallet/exprot-prikey/exprot-prikey.component";
//import {ReceiveComponent} from "../pages/coin/receive/receive.component";
//import {TransferComponent} from "../pages/coin/transfer/transfer.component";
//import {CoinComponent} from "../pages/coin/coin.component";
//import {CoinListComponent} from "../pages/coin/coin-list/coin-list.component";
//import {RecordinfoComponent} from "../pages/coin/recordinfo/recordinfo.component";
//import {RecordComponent} from "../pages/coin/record/record.component";
//import {TestJniComponent} from '../pages/testjni/testjni.component';
//import { AddressComponent } from '../pages/wallet/address/address.component'
import {TabsComponent} from '../pages/tabs/tabs.component';
import {LocalStorage} from "../providers/Localstorage";
import { Config } from '../providers/Config';
//add for plugin
declare var cordova: any;

@Component({
  selector: 'app',
  templateUrl: 'app.html',
})


export class AppComponent {
  rootPage: any;
  ls:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, localStorage: LocalStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.ls = localStorage;
      //init java 2 js plugin
      cordova.plugins.Java2JSBridge.init(this);


      //cordova.plugins.Java2JSBridge.getDeviceID();

    //  cordova.plugins.Java2JSBridge.getDeviceID(succeedCallback);
    //  function succeedCallback(message){
    //   //alert(message);
    //   console.log("-----setDeviceID------"+message);
    //   Config.setDeviceID(message);
    // }
    //alert(devideID);

      cordova.plugins.Java2JSBridge.getRegistrationID(succeedCallback);
      function succeedCallback(message){
        //alert(message);
        console.log("-----setDeviceID------"+message);
        Config.setDeviceID(message);
      }

      localStorage.getWallet().then((val) => {
        if (val) {
          this.rootPage = TabsComponent;
        } else {
          this.rootPage = LauncherComponent;
        }
      });

      localStorage.getKycList("kycId").then((val)=>{

             if(val == null || val === undefined || val === {} || val === ''){
                          return;
             }
            let serids = Config.getSertoId(JSON.parse(val));
            Config.setSerIds(serids);
      });
    });
  }

    //
    onReceiveJG(param) {
      alert('交易单号为：'+param+'已认证成功，请去订单列表查看');
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

}

