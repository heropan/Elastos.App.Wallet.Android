/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from '@angular/core';

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
@Injectable()
export class Utils {

  constructor() {
  }

  public static isNull(data): boolean {
    return (data === '' || data === undefined || data === null) ? true : false;
  }

  public static isEmptyObject(obj): boolean {
    for (let key of obj ) {
     if(obj.hasOwnProperty(key)){
        return false;
      }
    }
    return true;
  }

}
