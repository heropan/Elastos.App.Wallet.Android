import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

/***
 * 封装存储操作
 */
@Injectable()
export class LocalStorage {
  
  constructor(private storage: Storage) { }

  public add(key: string, value: any): any {
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

  public set(key: string, value: any): any {
    return this.storage.set(key, JSON.stringify(value));
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

  public setWallet(value: any): any {
    // TODO
    let key = "ELA-Wallet";
    return this.storage.set(key, JSON.stringify(value));
  }

  public getWallet(): any {
    // TODO
    let key = "ELA-Wallet";
    return this.storage.get(key);
  }

}


