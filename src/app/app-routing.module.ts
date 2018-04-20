import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


/**pages*/
import {AppComponent} from './app.component';
import {TabsComponent} from './../pages/tabs/tabs.component';
import {HomeComponent} from './../pages/tabs/home/home.component';
import {MyComponent} from './../pages/tabs/my/my.component';
import {LauncherComponent} from '../pages/launcher/launcher.component';
import { ManagerComponent } from '../pages/wallet/manager/manager.component';
import { ImportComponent } from '../pages/wallet/import/import.component';
import { ExprotPrikeyComponent } from '../pages/wallet/exprot-prikey/exprot-prikey.component';
import { MnemonicComponent } from '../pages/mnemonic/mnemonic.component';
import { WriteComponent } from '../pages/mnemonic/write/write.component';
import { AddressComponent } from '../pages/wallet/address/address.component';
import { MultiSignedComponent } from '../pages/multi-signed/multi-signed.component';
import { JoinComponent } from '../pages/multi-signed/join/join.component';
import { ContactsComponent } from '../pages/contacts/contacts.component';
import { SettingsComponent } from '../pages/universal/settings/settings.component';
import { ResultComponent } from '../pages/universal/result/result.component';
import { CoinComponent } from '../pages/coin/coin.component';
import { RecordComponent } from '../pages/coin/record/record.component';
import { TransferComponent } from '../pages/coin/transfer/transfer.component';
import { ReceiveComponent } from '../pages/coin/receive/receive.component';
import { ContactListComponent } from '../pages/contacts/contact-list/contact-list.component';
import { ContactCreateComponent } from '../pages/contacts/contact-create/contact-create.component';
import { CoinListComponent } from '../pages/coin/coin-list/coin-list.component';
import { WalletCreateComponent } from '../pages/wallet/wallet-create/wallet-create.component';
import { WalletInfoComponent } from '../pages/wallet/wallet-info/wallet-info.component';



/**Route Config*/
const routes: Routes = [
  {path: '', component: TabsComponent},  // 根目录和默认目录
  {path: 'home', component: TabsComponent},  // 根目录和默认目录

  {path: 'launcher', component: LauncherComponent}, // 启动页面


  // 钱包
  {path: 'wallet/create', component: WalletCreateComponent}, // 创建钱包
  {path: 'wallet/import', component: ImportComponent}, // 导入钱包
  {path: 'wallet/info', component: WalletInfoComponent}, // 钱包详情
  {path: 'wallet/manager', component: ManagerComponent}, // 钱包管理
  {path: 'wallet/exprot-prikey', component: ExprotPrikeyComponent}, // 导出私钥
  {path: 'wallet/address', component: AddressComponent}, // 钱包地址管理

  // 币种
  {path: 'coin/:id', component: CoinComponent}, // 币种主页面
  {path: 'coinlist', component: CoinListComponent}, // 币种列表
  {path: 'coin/:id/receive', component: ReceiveComponent}, // 收账
  {path: 'coin/:id/record', component: RecordComponent}, // 交易记录
  {path: 'coin/:id/transfer', component: TransferComponent}, // 转账

  // 联系人
  {path: 'contacts/list', component: ContactListComponent}, // 联系人列表
  {path: 'contacts/:id', component: ContactsComponent}, // 联系人详情
  {path: 'contacts/create', component: ContactCreateComponent}, // 联系人创建

  // 助记词
  {path: 'mnemonic', component: MnemonicComponent}, // 生成助记词
  {path: 'mnemonic/write', component: WriteComponent}, // 填写助记词


  {path: 'settings', component: SettingsComponent}, // 设置页面
  {path: 'result', component: ResultComponent}, // 处理结果页面，成功/失败

  {path: '**', component: TabsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
