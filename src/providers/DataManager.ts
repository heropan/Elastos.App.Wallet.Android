import {Injectable} from '@angular/core';





/***
 * 封装配置信息
 */
@Injectable()
export class DataManager {

  //map key is signature value is jsonObj (with seqnum and so on)
  public  SignSeqNumObjetMap = {};

  //add obj
  public  addSeqNumObj(sign :string , obj : any ){

    this.SignSeqNumObjetMap[sign] = obj;
    console.info("DataManager addSeqNumObj sign "+ sign + "obj "+ JSON.stringify(obj));
  }

  //get object
  public  getSeqNumObj(sign : string){
    console.info("DataManager getSeqNumObj sign "+ sign + "obj "+ JSON.stringify(this.SignSeqNumObjetMap[sign]));
    return this.SignSeqNumObjetMap[sign];
  }



}


