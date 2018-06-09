import {Injectable} from '@angular/core';





/***
 * 封装配置信息
 */
@Injectable()
export class Config {

  constructor() {

  }

  public static  COIN_LIST = {"ELA": {id: 0, name: 'ELA', balance: 0}};

  public static  WalletKey = "wallet";

  public static LIST_COUNT = 20;

}


