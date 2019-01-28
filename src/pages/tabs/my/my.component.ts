import { Component,ViewChild} from '@angular/core';
import {ManagerComponent} from "../../wallet/manager/manager.component";
import {ContactListComponent} from "../../contacts/contact-list/contact-list.component";
import {IdLauncherComponent} from "../../id/launcher/launcher";
import {IdHomeComponent} from "../../id/home/home";
import {PublickeyPage} from '../../../pages/publickey/publickey';
import {TxdetailsPage} from '../../../pages/txdetails/txdetails';
import { Config } from '../../../providers/Config';
import { NavController, NavParams,Events,Navbar } from 'ionic-angular';
import {WalletManager} from '../../../providers/WalletManager';
import {Native} from "../../../providers/Native";
import {LocalStorage} from "../../../providers/Localstorage";
import { Util } from '../../../providers/Util';
import {LanguagePage} from '../../../pages/wallet/language/language';
import {ScanPage} from '../../../pages/scan/scan';
@Component({
  selector: 'app-my',
  templateUrl: 'my.component.html',
})
export class MyComponent{
  @ViewChild(Navbar) navBar: Navbar;
  public masterWalletId:string = "1";
  public masterWalletType:string = "";
  public readonly:string="";
  public currentLanguageName:string = "";
  constructor(public navCtrl: NavController,public navParams: NavParams, public walletManager: WalletManager,public events :Events,public native :Native,public localStorage:LocalStorage){
       //this.init();
  }

  ionViewWillEnter(){
       this.init();
  }

  init() {
    this.localStorage.getLanguage("wallte-language").then((val)=>{
      this.currentLanguageName = JSON.parse(val)["name"] || "";
      let lang=  JSON.parse(val)["isoCode"] || "";
      if(lang == 'en'){
        this.native.setMnemonicLang("english");
      }else if(lang == "zh"){
       this.native.setMnemonicLang("chinese");
      }else{
       this.native.setMnemonicLang("english");
      }
    });

    this.events.subscribe('language:update', (item) => {
     this.currentLanguageName = item["name"] || "";
     let lang=  item["isoCode"] || "";
     if(lang == 'en'){
       this.native.setMnemonicLang("english");
     }else if(lang == "zh"){
      this.native.setMnemonicLang("chinese");
     }else{
      this.native.setMnemonicLang("english");
     }
    });

    this.events.subscribe("wallte:update",(item)=>{
          this.masterWalletId = item;
          this.getMasterWalletBasicInfo();
    });
    this.masterWalletId = Config.getCurMasterWalletId();
    this.getAllMyTransaction();
    this.getMasterWalletBasicInfo();
  }

  getMasterWalletBasicInfo(){
    this.walletManager.getMasterWalletBasicInfo(this.masterWalletId,(data)=>{
      if(data["success"]){
         this.native.info(data);
         let item = JSON.parse(data["success"])["Account"];
         this.masterWalletType = item["Type"];
         this.readonly = item["InnerType"] || "";
      }else{
         this.native.info(data);
      }
    });
  }

  onNext(type): void {
     switch (type){
       case 0:
         this.native.Go(this.navCtrl,ManagerComponent);
         break;
       case 1:
       this.native.Go(this.navCtrl,PublickeyPage);
         break;
       case 2:
        this.native.Go(this.navCtrl,ContactListComponent);
         break;
       case 3:
         this.sendTX();
         break;
       case 4:
         this.singTx();
         break;
       case 6:
          this.getDIDList();
         break;
        case 5:
         this.setLanguage();
         break;
        case 7:
           this.getVoteNode();
           break;
        case 8:
           this.native.Go(this.navCtrl,'AboutPage');
          break;
        case 9:
           this.createRetrieveDepositTransaction();
         break;
     }
   }

   getDIDList(){
    this.localStorage.get("kycId").then((val)=>{
      if(Util.isNull(val)){
        this.native.Go(this.navCtrl,IdLauncherComponent);
          return;
      }
      this.native.Go(this.navCtrl,IdHomeComponent);
    });
   }

   singTx(){
    this.native.Go(this.navCtrl,ScanPage,{"pageType":"3"});
   }

   sendTX(){
      this.native.Go(this.navCtrl,ScanPage,{"pageType":"4"});
   }

   ionViewDidLeave() {
    this.events.unsubscribe("wallte:update");
   }

   setLanguage(){
    this.localStorage.getLanguage("wallte-language").then((val)=>{
      let item =JSON.parse(val);
      this.native.Go(this.navCtrl,LanguagePage,item);
     });
   }

   getVoteNode(){
      this.getRegisteredProducerInfo();
   }

   getRegisteredProducerInfo(){
      this.walletManager.getRegisteredProducerInfo(this.masterWalletId,"ELA",(data)=>{
                  this.native.info(data);
                  if(data["success"]){
                    this.native.info(data);
                    let parms= JSON.parse((data["success"]));
                    this.native.Go(this.navCtrl,'SuperpointPage',parms);
                  }
      });
   }

   createRetrieveDepositTransaction(){
     this.walletManager.createRetrieveDepositTransaction(this.masterWalletId,"ELA","",(data)=>{
            this.native.info(data);
     });
   }


   getAllMyTransaction(){
     this.walletManager.getAllMyTransaction(this.masterWalletId,"ELA",0,"",(data)=>{
               this.native.info(data);
               if(data["success"]){

               }
     });
   }
}
