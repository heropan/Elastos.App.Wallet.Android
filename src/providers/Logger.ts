import { Injectable, isDevMode } from '@angular/core';

import * as _ from 'lodash';

/**
 * 日志控制
 */
@Injectable()
export class Logger {

  constructor() {

  }

  public static error(message?: any,...optionalParams: any[]): void {
    let msg = '[error] ' + (_.isString(message) ? message : JSON.stringify(message));
    console.log(msg,optionalParams);
  }

  public static debug(message?: any, ...optionalParams: any[]): void {
    let msg = '[debug] ' + (_.isString(message) ? message : JSON.stringify(message));
    if (isDevMode()) console.log(msg,optionalParams);
  }

  public static info(message?: any, ...optionalParams: any[]): void {
    let msg = '[info] ' + (_.isString(message) ? message : JSON.stringify(message));
    if (isDevMode()) console.log(msg, ...optionalParams);
  }

  public static warn(message?: any, ...optionalParams: any[]): void {
    let msg = '[warn] ' + (_.isString(message) ? message : JSON.stringify(message));
    if (isDevMode()) console.log(msg, ...optionalParams);
  }
}
