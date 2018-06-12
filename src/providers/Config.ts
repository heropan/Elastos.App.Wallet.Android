import {Injectable} from '@angular/core';





/***
 * 封装配置信息
 */
@Injectable()
export class Config {

  constructor() {

  }

  public static COIN_LIST = {"ELA": {id: 0, name: 'ELA', balance: 0}};

  public static MANAGER_LIST = [{name: '备份钱包'}, {name: '导入钱包'}, {name: '钱包详情'}, {name: '退出钱包'}]

  public static WalletKey = "wallet";

  public static LIST_COUNT = 20;

}


