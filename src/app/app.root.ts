import {Component} from '@angular/core';
//import {NavController, Platform} from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import {BaseComponent} from './BaseComponent';
//import {HeaderComponent, Header} from './header/app.header';
import {TabsComponent} from "../pages/tabs/tabs.component";
//import {Location} from "@angular/common";
//import {TranslateService} from "@ngx-translate/core";
//import {Logger} from "../providers/Logger";
// import {StorageUtil} from "../providers/StorageUtil";
//import {LauncherComponent} from "../pages/launcher/launcher.component";
//import {Utils} from "../providers/Utils";
//import {WalletCreateComponent} from "../pages/wallet/wallet-create/wallet-create.component";
//import {MnemonicComponent} from "../pages/mnemonic/mnemonic.component";
//import {WriteComponent} from "../pages/mnemonic/write/write.component";
//import {ImportComponent} from "../pages/wallet/import/import.component";
//import {ExprotPrikeyComponent} from "../pages/wallet/exprot-prikey/exprot-prikey.component";
//import {ReceiveComponent} from "../pages/coin/receive/receive.component";
//import {TransferComponent} from "../pages/coin/transfer/transfer.component";
//import {CoinComponent} from "../pages/coin/coin.component";
//import {RecordinfoComponent} from "../pages/coin/recordinfo/recordinfo.component";
//import {RecordComponent} from "../pages/coin/record/record.component";
//import {TestJniComponent} from '../pages/testjni/testjni.component';
@Component({
  selector: 'root',
  templateUrl: './app.root.html'
})
export class RootComponent{

  rootPage:any;

  public constructor() {
    this.rootPage= TabsComponent;
    //this.rootPage = TestJniComponent;
    return;

    //
    // this.storage.get("isWalletOpen", (data) => {
    //   if(Utils.isNull(data)){
    //     this.rootPage= LauncherComponent;
    //   }else{
    //     this.rootPage= TabsComponent;
    //   }
    // });
  }
}

