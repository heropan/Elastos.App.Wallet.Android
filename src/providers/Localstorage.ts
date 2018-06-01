import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

/***
 * 封装存储操作
 */
@Injectable()
export class LocalStorage {
  
  constructor(private storage: Storage) { }

  public set(key: string, value: any): any {
    return this.get(key).then((val)=>{
     let id = value['id'];
     if(val === null){
      let initObj = {};
      initObj[id] = value;
      return this.storage.set(key, JSON.stringify(initObj));
     }
     let addObj = JSON.parse(val);
     addObj[id] = value;
     return this.storage.set(key, JSON.stringify(addObj));
    });
  }

  public get(key: string): any {
    return this.storage.get(key);
  }

  public remove(key: string): any {
    return this.storage.remove(key);
  }

  public clear(): any {
    return this.storage.clear();
  }

  // public getWallet(Fun){
  //   this.getObject(Config.WalletKey, (val)=> {
  //     if(Utils.isNull(val)){
  //       let walletModel = new WalletModel();
  //       this.setObject(Config.WalletKey,walletModel);

  //       Fun(walletModel);
  //     }else{

  //       Fun(val);
  //     }
  //   });
  // }

}


