import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Logger} from './Logger';
import 'rxjs/add/operator/toPromise';
//import {Validators} from "./Validators";
//import {ApiUrl} from "./ApiUrl";


/***
 * 请求处理
 *
 * demo：
 *  this.http.get(ApiUrl.AUTH_COMPANY,{city:'北京'},data => {
          console.log(data);
      },error => {
          console.log(error);
      });
 */
@Injectable()
export class HttpProvider {


  static METHOD_GET = 'GET';
  static METHOD_POST = 'POST';

  headers:HttpHeaders;

  constructor(private http: HttpClient) {
    Logger.info('Http initialized.');
    //统一设置响应头
    this.headers = new HttpHeaders();
    this.headers.set('Access-Control-Allow-Origin','*');
  }

  public request(method:string,url: string, params: any,successFun:any,errorFun:any): any {
    return this.http.request(method,url, {'headers':this.headers,'params':params})
      .subscribe(data=>{
        this.handleSuccess(data,successFun,errorFun);
      },error =>{
        this.handleError(error);
    })
  }

  /***
   * get 请求
   * @param {string} url
   * @param params
   * @param successFun 成功回调
   * @param errorFun  失败回调
   * @returns {any}
   */
  public get(url: string, params: any,successFun:any,errorFun:any): any {
    this.request(HttpProvider.METHOD_GET,url,params,successFun,errorFun);
  }

  /***
   * post 请求
   * @param {string} url
   * @param params
   * @param successFun 成功回调
   * @param errorFun 失败回调
   */
  public post(url: string, params: any,successFun:any,errorFun:any) {
    this.request(HttpProvider.METHOD_POST,url,params,successFun,errorFun);
  }

  /**
   * 处理请求成功
   * @param res
   * @returns {{data: (string|null|((node:any)=>any)
 */
  private handleSuccess(res: any,successFun:any,errorFun:any) {
    // if(Validators.checkNull(res)){    //没有实体信息
    //     return {data:{},code:500};
    // }
    Logger.info(res);
    switch (res.status){
      case 200:
      default:
        successFun(res);
        break;
      // case 'FAIL':
      //   //错误处理
      //   break;
      case 500:
        errorFun(res);
        break;
    }

  }

  /**
   * 处理请求错误
   * @param error
   * @returns {void|Promise<string>|Promise<T>|any}
   */
  private  handleError(res:any) {
    Logger.info(res);
    switch (res.status){
      case 0:
        Logger.error(res.message);
        //网络错误，统一提示
        break;
    }

  }

}
