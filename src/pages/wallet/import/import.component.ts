import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';
import {TabsComponent} from '../../../pages/tabs/tabs.component';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html'
})
export class ImportComponent extends BaseComponent implements OnInit {
  public selectedTab: string="words";
  public showAdvOpts:boolean;
  public keyStoreContent:any;
  public importFileObj:any={payPassword: "",rePayPassword: "", backupPassWord: "",phrasePassword:""};
  public mnemonicObj:any={mnemonic:"",payPassword: "", rePayPassword: "",phrasePassword:""}
  public toggleShowAdvOpts(): void {
    this.showAdvOpts = !this.showAdvOpts;
  }
  selectTab(tab: string) {
     this.selectedTab = tab;
  }

  ngOnInit() {
    this.setTitleByAssets('launcher-backup-import');
  }

  onImport() {
     switch(this.selectedTab){
       case "words":
            if(this.checkWorld()){
               this.importWalletWithMnemonic();
            }
       break;
       case "file":
          if(this.checkImportFile()){
               this.importWalletWithKeystore();
          }
       break;
     }
  }

  checkImportFile(){
   if(this.isNull(this.keyStoreContent)){
      this.messageBox('import-text-keystroe-message');
          return false;
    }
    if(this.isNull(this.importFileObj.backupPassWord)){
      this.messageBox('text-backup-passworld-input');
      return false;
    }
    if(this.isNull(this.importFileObj.payPassword)){
      this.messageBox('text-pay-passworld-input');
      return false;
    }

    if(this.importFileObj.payPassword!=this.importFileObj.rePayPassword){
      this.messageBox('text-passworld-compare');
      return false;
    }
    return true;
  }

  importWalletWithKeystore(){
    this.walletManager.importWalletWithKeystore("1",
                      this.keyStoreContent,this.importFileObj.backupPassWord,
                      this.importFileObj.payPassword,this.importFileObj.phrasePassword,
                      ()=>{
                             this.getAllCreatedSubWallets();
                      });
  }

  checkWorld(){
    if(this.isNull(this.mnemonicObj.mnemonic)){
        this.messageBox('text-input-mnemonic');
        return false;
    }

    let mnemonic = this.normalizeMnemonic(this.normalizeMnemonic(this.mnemonicObj.mnemonic));
    if(mnemonic.split(/[\u3000\s]+/).length != 12){
      this.messageBox('text-mnemonic-validator');
      return false;
    }

    if(this.isNull(this.mnemonicObj.payPassword)){
      this.messageBox('text-pay-password');
      return false;
    }
    if(this.mnemonicObj.payPassword!=this.mnemonicObj.rePayPassword){
      this.messageBox('text-passworld-compare');
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
    let mnemonic = this.normalizeMnemonic(this.normalizeMnemonic(this.mnemonicObj.mnemonic));
    this.walletManager.importWalletWithMnemonic("1",mnemonic,this.mnemonicObj.phrasePassword,this.mnemonicObj.payPassword,this.getMnemonicLang(),()=>{
                 this.messageBox('import-text-world-sucess');
                 this.localStorage.setWallet({
                  'name': "ELA-Wallet"
                 }).then(()=>{
                    this.Go(TabsComponent);
                 });

    });
  }

  getAllCreatedSubWallets(){

    this.localStorage.get('coinListCache').then((val)=>{
         let coinListCache = JSON.parse(val);
      this.walletManager.getAllCreatedSubWallets((createdChains) => {
         for(let china in coinListCache){
             if(this.isExitCoinListCache(china,createdChains) === -1){
                    delete(coinListCache[china])
             }
         }

         this.localStorage.set('coinListCache', coinListCache).then(()=>{
          this.messageBox('import-text-keystroe-sucess');
          this.localStorage.setWallet({
            'name': "sss"
           }).then(()=>{
            this.Go(TabsComponent);
           });
         });
      });
    });
  }

  isExitCoinListCache(cacheChain,createdChains){
    let result = -1;
    for (let chain in createdChains) {
           if(cacheChain === chain){
                result = 1;
           }
    }
         return result;
  }

}
