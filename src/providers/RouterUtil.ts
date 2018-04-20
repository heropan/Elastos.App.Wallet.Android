import {Component, OnInit, Injectable} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


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
   * 路由跳转 直接访问url
   * @param {string} path
   * @constructor
   */
  GoByUrl(path: string) {
    this.router.navigateByUrl(path);
  }
}
