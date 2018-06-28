import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {Config} from '../../../providers/Config';
import {IdHomeComponent} from "../../../pages/id/home/home";
//import {IDManager} from '../../../providers/IDManager';
import {Native} from '../../../providers/Native';


@Component({
  selector: 'id-create',
  templateUrl: 'create.html',
})
export class IdCreateComponent extends BaseComponent implements OnInit{

  createData = {
    createType: 1,   //1 个人  2企业
    password:'',
    rePassWord:''
  };

  onChange(type){
    this.createData.createType = type;
  }

  ngOnInit(){
    //this.localstorage.clear();
    this.setTitleByAssets('text-id-create');
  }

  onCommit(){
     if(this.isNull(this.createData.password)){
          this.messageBox('text-passworld-message');
          return;
     }
    if(this.isNull(this.createData.rePassWord)){
       this.messageBox('text-repassworld-message');
      return;
    }
    if(this.createData.password != this.createData.rePassWord){
      this.messageBox('text-passwold-dif');
      return;
    }

    this.createDID();
  }

  tiaozhuan(obj){
    this.localStorage.add('kyc',obj).then((val)=>{
        Config.setKycObj(JSON.parse(val));
        this.Go(IdHomeComponent);
      });
  }

  createDID(){
    this.walletManager.createDID(this.createData.password,(result)=>{
                    let id = result.didname;
                    if( this.createData.createType === 1){
                      let personObj = Config.getPersonObj();
                      personObj.id = id;
                      personObj.createType = this.createData.createType;
                      personObj.backupPassword = this.createData.password;
                      this.tiaozhuan(personObj);
                  }else if(this.createData.createType === 2){
                    let companyObj = Config.getCompanyObj();
                    companyObj.id = id;
                    companyObj.createType = this.createData.createType;
                    companyObj.backupPassword = this.createData.password;
                    this.tiaozhuan(companyObj);
                  }

    });
  }

}
