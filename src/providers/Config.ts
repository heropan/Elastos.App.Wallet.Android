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
  public  COIN_LIST = [
    {id: '0', name: 'ELA'}
  ];

  public  test: any = '';
}


