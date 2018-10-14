import {Component,ViewChild} from '@angular/core';
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

  onSelect(item) {
     console.log("====item===="+JSON.stringify(item));
     if(item.open){
      this.currentCoin = item;
      //this.createMode();
      this.createSubWallet();
     }else{
        let subWallte = Config.getSubWallet(this.masterWalletId);
        //this.localStorage.get('coinListCache').then((val)=>{
        //let coinListCache = JSON.parse(val);
        delete(subWallte[item.name]);
        let walletObj = this.native.clone(Config.masterWallObj);
        walletObj["id"]   = this.masterWalletId;
        walletObj["wallname"] = Config.getWalletName(this.masterWalletId);
        walletObj["coinListCache"] = subWallte;
        this.localStorage.saveMappingTable(walletObj).then((walletObj)).then((data)=>{
          let  mappingList = this.native.clone(Config.getMappingList());
          mappingList[this.masterWalletId] = walletObj;
         console.log("=====mappingList===="+JSON.stringify(mappingList));
          Config.setMappingList(mappingList);
        });
        //this.localStorage.set('coinListCache',coinListCache);
      //});
     }
  }

  init() {
    this.events.subscribe("error:update",()=>{
      this.currentCoin["open"] = false;
    });
    this.masterWalletId =Config.getCurMasterWalletId();
    //this.localStorage.get('coinListCache').then((val)=>{
      let subWallte= Config.getSubWallet(this.masterWalletId);
      console.log("=====subWallte======")
      this.walletManager.getSupportedChains(this.masterWalletId,(data) => {
        if(data['success']){
          console.log("====getSupportedChains===="+JSON.stringify(data));
          let allChains = data['success'];
          for (let index in allChains) {
            let chain = allChains[index];
            let isOpen = false;
            //let coinListCache = JSON.parse(val);
            if (subWallte) {
              isOpen = chain in subWallte ? true : false;
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
    //});
  }

  createSubWallet(){
    // Sub Wallet IdChain
    let chainId = this.currentCoin["name"];
    //this.currentCoin["open"] = false;
    this.walletManager.createSubWallet(this.masterWalletId,chainId,0, (data)=>{
      if(data['success']){
        let coin = this.native.clone(Config.getSubWallet(this.masterWalletId));
        if(coin){
          coin[chainId] = {id:chainId};
        }else{
          coin = {};
          coin[chainId] = {id:chainId};
        }

        //this.localStorage.add('coinListCache', coin);
        let walletObj = this.native.clone(Config.masterWallObj);
        walletObj["id"]   = this.masterWalletId;
        walletObj["wallname"] = Config.getWalletName(this.masterWalletId);
        walletObj["coinListCache"] = coin;
        this.localStorage.saveMappingTable(walletObj).then((data)=>{
          let  mappingList = this.native.clone(Config.getMappingList());
          mappingList[this.masterWalletId] = walletObj;
          Config.setMappingList(mappingList);
        });
      }else{
        this.currentCoin["open"] = false;
        alert("createSubWallet===error=="+JSON.stringify(data));
      }
    });
  }

  ionViewDidLeave() {
     this.events.unsubscribe("error:update");
  }

}
