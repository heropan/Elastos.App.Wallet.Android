import {Component,ViewChild} from '@angular/core';
import {Util} from "../../../providers/Util";
import {CoinlistpasswordPage} from '../../../pages/coinlistpassword/coinlistpassword';
import { NavController, NavParams,ModalController,Navbar,Events } from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import { Config } from '../../../providers/Config';
@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html'
})
export class CoinListComponent {
  @ViewChild(Navbar) navBar: Navbar;
  masterWalletId:string = "1";
  coinList = [];
  coinListCache = {};
  payPassword: string = "";
  singleAddress: boolean = false;
  currentCoin:any;
  constructor(public navCtrl: NavController,public navParams: NavParams, public walletManager: WalletManager,
              public native: Native,public localStorage:LocalStorage,public modalCtrl: ModalController,public events :Events ) {
             this.init();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e)=>{
      console.log("========back=======");
      this.events.publish("home:update");
      this.navCtrl.pop();
    };
  }

  createMode(){
    let modal = this.modalCtrl.create(CoinlistpasswordPage);
        modal.onDidDismiss((data)=>{
              if(!Util.isEmptyObject(data)){
                console.log("==1111==="+JSON.stringify(data));
                this.createSubWallet(data);
              }else{
                console.log("==2222==="+JSON.stringify(data));
                this.currentCoin["open"] = false;
              }
        });
        modal.present();
  }
  onSelect(item) {
     console.log("====item===="+JSON.stringify(item));
     if(item.open){
      this.currentCoin = item;
      this.createMode();
     }else{
        this.localStorage.get('coinListCache').then((val)=>{
        let coinListCache = JSON.parse(val);
        delete(coinListCache[item.name]);
        this.localStorage.set('coinListCache',coinListCache);
      });
     }
  }

  init() {
    this.masterWalletId =Config.getCurMasterWalletId();
    this.localStorage.get('coinListCache').then((val)=>{
      this.walletManager.getSupportedChains(this.masterWalletId,(data) => {
        if(data['success']){
          console.log("====getSupportedChains===="+JSON.stringify(data));
          let allChains = data['success'];
          for (let index in allChains) {
            let chain = allChains[index];
            let isOpen = false;
            let coinListCache = JSON.parse(val);
            if (coinListCache) {
              isOpen = chain in coinListCache ? true : false;
            }
            if (chain == "ELA") {
              isOpen = true;
            }
            this.coinList.push({name: chain, open: isOpen});
          }
        }else{
            alert("====getSupportedChains==error=="+JSON.stringify(data));
        }
      });
    });
  }

  createSubWallet(data){
    // Sub Wallet IdChain
    let chainId = this.currentCoin["name"];
    let payPassword = data["password"];
    let singleAddress= data["singleAddress"];
    //this.currentCoin["open"] = false;
    this.walletManager.createSubWallet(this.masterWalletId,chainId,payPassword,singleAddress, 0, (data)=>{
      console.log("==333==="+JSON.stringify(data));
      if(data['success']){
         console.log("createSubWallet==="+JSON.stringify(data));
        let coin = {};
        coin["id"] = chainId;
        this.localStorage.add('coinListCache', coin);
      }else{
        this.currentCoin["open"] = false;
        alert("createSubWallet===error=="+JSON.stringify(data));
      }
    });
  }

}
