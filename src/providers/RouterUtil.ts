import {Injectable} from '@angular/core';
// import {Router, ActivatedRoute} from '@angular/router';
//import {Utils} from './Utils';
import {NavController} from "ionic-angular";


/**
 * 封装 Component 常用操作，
 */
@Injectable()
export class RouterUtil {

  public nav:NavController

  public constructor(public navCtrl:NavController) {
    this.nav = navCtrl;
  }


  getRouteInstance() {
    //return this.router;
  }

  /***
   * 路由跳转
   * @param {string} path
   * @param options 参数 ?key=value
   * @param id      id   /:id
   * @constructor
   */
  Go(page: any, options: {}) {
    this.nav.push(page,options);
    //this.router.navigate([path, id], {queryParams: options});
  }

  Back(){
    this.nav.pop();
  }

  /**
   * 路由跳转 直接访问url
   * @param {string} path
   * @constructor
   */
  GoByUrl(path: string) {
   // this.router.navigateByUrl(path);
  }


}
