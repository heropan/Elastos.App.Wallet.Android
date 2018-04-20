import {Injectable} from '@angular/core';


/***
 * APP底层交互
 */
@Injectable()
export class Native {

  constructor() {

  }

  /**
   * 获取设备信息
   * @returns {{platform: string; model: string; version: number; uuid: string; ua: string}}
   */
  getDeviceInfo() {
    return {
      platform: 'Android',
      model: '5s',
      version: 6.0,
      uuid: '15165165',
      ua: 'webkit'
    };
  }


  /***
   * 获取网络状态
   * @returns {{ConnectionType: string}}
   */
  getNetWorkInfo() {
    return {
      ConnectionType: 'wifi'
    };
  }

  /***
   * 调用二维码扫描
   * @returns {{codeData: string}}
   */
  scan() {
    return {
      codeData: 'EehM1A6MnVZxs6qH8AEA1pSLeW4RxmqhuU'
    };
  }

  /***
   * 打开文件
   * @returns {{file: {}; path: string; fileType: string}}
   */
  openFile() {
    return {
      file: {},
      path: 'xxx',
      fileType: 'jpg'
    };
  }

  /**
   * 打开私钥
   * @returns {{}}
   */
  openPrikey() {
    return {};
  }

  /***
   * 导出文件
   * @param json
   */
  exportFile(json) {

  }

  /**
   * 复制到剪贴板
   * @param options
   * @constructor
   */
  CopyClipboard(options) {

  }

  /**
   * 粘贴剪切板
   * @returns {string}
   * @constructor
   */
  PasteClipboard() {
    return 'xxxxxx';
  }

  /**
   * 配置跨域
   */
  crossDomain() {

  }

  /**
   * kyc 认证
   * @param options
   */
  key(options) {

  }
}


