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
import {CoinListComponent} from "../pages/coin/coin-list/coin-list.component";
//import {RecordinfoComponent} from "../pages/coin/recordinfo/recordinfo.component";
//import {RecordComponent} from "../pages/coin/record/record.component";
//import {TestJniComponent} from '../pages/testjni/testjni.component';
//import { AddressComponent } from '../pages/wallet/address/address.component'
import {TabsComponent} from '../pages/tabs/tabs.component';
import {LocalStorage} from "../providers/Localstorage";

@Component({
  selector: 'app',
  templateUrl: 'app.html',
})
export class AppComponent {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, localStorage: LocalStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      localStorage.getWallet().then((val) => {
        if (val) {
          this.rootPage = TabsComponent;
        } else {
          this.rootPage = LauncherComponent;
        }
      });
    });
  }
}

