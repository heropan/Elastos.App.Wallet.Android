/**
 * Created by yanxiaojun617@163.com on 3-12.
 */
import {Injectable} from '@angular/core';
//import {Validators as angularValidators, AbstractControl} from '@angular/forms';

@Injectable()
export class ValidatorsUtil {

  /*E-mail*/
  static email = function (text) {
    const email = /[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{2,3}([\\.][a-z]{2})?/;
    return email.test(text);
  };

  static phone = function (text) {
    const mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    return mPattern.test(text);
  };

  static username = function (text) {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    return uPattern.test(text);
  };

  static password = function (text) {
    //var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    var pPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    return pPattern.test(text);
  };
  static number = function (text) {
    var numPattern = /^-?\d*\.?\d+$/;
    return numPattern.test(text);
  };

  public static isNull(data): boolean {
    return (data === '' || data === undefined || data === null) ? true : false;
  }

  public static isMnemonicValid(mnemonicStr): boolean {
    return mnemonicStr.split(/[\u3000\s]+/).length == 12 ? true : false
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
