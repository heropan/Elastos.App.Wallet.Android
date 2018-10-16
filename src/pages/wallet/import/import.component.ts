import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import {TabsComponent} from '../../../pages/tabs/tabs.component';
import {Util} from "../../../providers/Util";
import {Config} from '../../../providers/Config';
import { Chain } from '@angular/compiler';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html'
})
export class ImportComponent {
  masterWalletId:string = "1";
  public selectedTab: string="words";
  public showAdvOpts:boolean;
  public keyStoreContent:any;
  public importFileObj:any={payPassword: "",rePayPassword: "", backupPassWord: "",name:""};
  public mnemonicObj:any={mnemonic:"",payPassword: "", rePayPassword: "",phrasePassword:"",name:"",singleAddress:false};
  public walletType:string;
  constructor(public navCtrl: NavController,public navParams: NavParams, public walletManager: WalletManager,public native: Native,public localStorage:LocalStorage) {
         this.masterWalletId = Config.uuid(6,16);
  }
  public toggleShowAdvOpts(): void {
    this.showAdvOpts = !this.showAdvOpts;
  }
  selectTab(tab: string) {
     this.selectedTab = tab;
  }


  onImport() {
     //this.native.showLoading();
     switch(this.selectedTab){
       case "words":
            if(this.checkWorld()){
               this.native.showLoading();
               setTimeout(() => {
                this.importWalletWithMnemonic();
               },100);

             }
       break;
       case "file":
          if(this.checkImportFile()){
               this.native.showLoading();
               setTimeout(()=>{
                this.importWalletWithKeystore();
               },100);
          }
       break;
     }
  }

  checkImportFile(){

   if(Util.isNull(this.keyStoreContent)){
      //this.native.hideLoading();
      this.native.toast_trans('import-text-keystroe-message');
          return false;
    }

    if(Util.isNull(this.importFileObj.name)){
      //this.native.hideLoading();
      this.native.toast_trans("text-wallet-name-validator");
      return false;
    }
    if(Util.isNull(this.importFileObj.backupPassWord)){
      //this.native.hideLoading();
      this.native.toast_trans('text-backup-passworld-input');
      return false;
    }
    if(Util.isNull(this.importFileObj.payPassword)){
      //this.native.hideLoading();
      this.native.toast_trans('text-pay-passworld-input');
      return false;
    }

    if(this.importFileObj.payPassword!=this.importFileObj.rePayPassword){
      //this.native.hideLoading();
      this.native.toast_trans('text-passworld-compare');
      return false;
    }
    return true;
  }

  importWalletWithKeystore(){
    this.walletManager.importWalletWithKeystore(this.masterWalletId,
                      this.keyStoreContent,this.importFileObj.backupPassWord,
                      this.importFileObj.payPassword,
                      (data)=>{
                        if(data["success"]){
                               this.walletManager.createSubWallet(this.masterWalletId,"ELA",0, (data)=>{
                                if(data["success"]){
                                   this.getAllCreatedSubWallets();
                                 }else{
                                   this.native.hideLoading();
                                   alert("=====createSubWallet=error"+JSON.stringify(data));
                                 }
                          });

                        }else{
                           this.native.hideLoading();
                           alert("=====importWalletWithKeystore=error"+JSON.stringify(data));
                        }
                      });
  }

  checkWorld(){
    if(Util.isNull(this.mnemonicObj.name)){
        //this.native.hideLoading();
        this.native.toast_trans("text-wallet-name-validator");
        return false;
    }
    if(Util.isNull(this.mnemonicObj.mnemonic)){
      //this.native.hideLoading();
        this.native.toast_trans('text-input-mnemonic');
        return false;
    }

    let mnemonic = this.normalizeMnemonic(this.mnemonicObj.mnemonic).replace(/^\s+|\s+$/g,"");
    if(mnemonic.split(/[\u3000\s]+/).length != 12){
      //this.native.hideLoading();
      this.native.toast_trans('text-mnemonic-validator');
      return false;
    }

    if(Util.isNull(this.mnemonicObj.payPassword)){
      //this.native.hideLoading();
      this.native.toast_trans('text-pay-password');
      return false;
    }
    if (!Util.password(this.mnemonicObj.payPassword)) {
      //this.native.hideLoading();
      this.native.toast_trans("text-pwd-validator");
      return false;
    }
    if(this.mnemonicObj.payPassword!=this.mnemonicObj.rePayPassword){
      //this.native.hideLoading();
      this.native.toast_trans('text-passworld-compare');
      return false;
    }
    return true;
  }


  private normalizeMnemonic(words: string): string {
    if (!words || !words.indexOf) return words;
    let isJA = words.indexOf('\u3000') > -1;
    let wordList = words.split(/[\u3000\s]+/);

    return wordList.join(isJA ? '\u3000' : ' ');
  };

  importWalletWithMnemonic(){
    let mnemonic = this.normalizeMnemonic(this.mnemonicObj.mnemonic);
    this.walletManager.importWalletWithMnemonic(this.masterWalletId,mnemonic,this.mnemonicObj.phrasePassword,this.mnemonicObj.payPassword,this.mnemonicObj.singleAddress,this.native.getMnemonicLang(),(data)=>{
                if(data["success"]){

                       this.walletManager.createSubWallet(this.masterWalletId,"ELA",0, (data)=>{
                        if(data["success"]){
                          this.native.toast_trans('import-text-world-sucess');
                          this.saveWalletList(null);
                        }else{
                             this.native.hideLoading();
                             alert("createSubWallet==error"+JSON.stringify(data));
                        }
                         });
                }else{
                    this.native.hideLoading();
                    alert("importWalletWithMnemonic==error"+JSON.stringify(data));
                }
            });
  }

  getAllCreatedSubWallets(){

      this.walletManager.getAllSubWallets(this.masterWalletId,(data) => {
        if(data["success"]){
          let chinas = this.getCoinListCache(JSON.parse(data["success"]));
           //this.localStorage.set('coinListCache',chinas).then(()=>{
            this.native.toast_trans('import-text-keystroe-sucess');
            this.saveWalletList(chinas);
           //});
        }else{
            this.native.hideLoading();
            alert("==getAllSubWallets==error"+JSON.stringify(data));
        }

      });

  }

   getCoinListCache(createdChains){
    let chinas = {};
    for (let index in createdChains) {
           let chain = createdChains[index];
           if(chain != "ELA"){
            chinas[chain] = chain;
           }
    }
         return chinas;
  }

  saveWalletList(subchains){
    Config.getMasterWalletIdList().push(this.masterWalletId);
            this.localStorage.saveCurMasterId({masterId:this.masterWalletId}).then((data)=>{
              let name ="";
              if(this.selectedTab === "words"){
                    name = this.mnemonicObj.name;
              }else if(this.selectedTab === "file"){
                    name = this.importFileObj.name;
              }
              let walletObj = this.native.clone(Config.masterWallObj);
              walletObj["id"]   = this.masterWalletId;
              walletObj["wallname"] = name;
              if(subchains){
                walletObj["coinListCache"] = subchains;
              }
              this.localStorage.saveMappingTable(walletObj).then((data)=>{
              let  mappingList = this.native.clone(Config.getMappingList());
            mappingList[this.masterWalletId] = walletObj;
           console.log("=====mappingList===="+JSON.stringify(mappingList));
            Config.setMappingList(mappingList);
                    this.native.hideLoading();
                    Config.setCurMasterWalletId(this.masterWalletId);
                    this.native.setRootRouter(TabsComponent);
              });

            });
  }

}
