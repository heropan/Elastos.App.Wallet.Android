import {Component, OnInit, Injectable} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Utils} from './Utils';


/**
 * 封装 Component 常用操作，
 */
@Injectable()
export class RouterUtil {

  public constructor(public router: Router) {
  }


  getRouteInstance() {
    return this.router;
  }

  /***
   * 路由跳转
   * @param {string} path
   * @param options 参数 ?key=value
   * @param id      id   /:id
   * @constructor
   */
  Go(path: string, options: any = {}, id: any = {}) {
    this.router.navigate([path, id], {queryParams: options});
  }

  /**
   * 路由跳转
   * @params:
   * {
   *   path:string  // 路径
   *   id:string     // id
   *   qParams:any  // 查询参数
   * }
   */
  Go_v2(params) {
    if (Utils.isNull(params.path)) {
          return;
    }
   let isShow1 = false;
   let isShow2 = false;
   let id = '';
   if (Utils.isNull(params.id)) {
     id = '';
     isShow1 = true;
   } else {
     id  = params.id;
   }
    let qParams = {};
    if (Utils.isNull(params.qParams)) {
       qParams = {};
       isShow2 = true;
    } else {
      qParams = params.qParams;
    }

    if (isShow2 && isShow1) {
      this.router.navigateByUrl(params.path);
      return;
    }

    if (!isShow2 && !isShow1) {
      this.router.navigate([params.path, id], {queryParams: qParams});
      return;
    }

    if (!isShow1) {
      this.router.navigate([params.path, id]);
      return;
    }

    if (!isShow2) {
      this.router.navigate([params.path], {queryParams: qParams});
      return;
    }
  }

  /**
   * 路由跳转 直接访问url
   * @param {string} path
   * @constructor
   */
  GoByUrl(path: string) {
    this.router.navigateByUrl(path);
  }
}
