import {Injectable} from '@angular/core';





/***
 * 封装配置信息
 */
@Injectable()
export class Config {

  constructor() {

  }

  /**
   * 币种列表
   * @type {{id: string; name: string}[]}
   */
  public static  COIN_LIST = [
    {id: '0', name: 'ELA'}
  ];

  public  static test: any = '';

  public static  WalletKey = "wallet";
}


