import { Component,OnInit } from '@angular/core';
import {BaseComponent} from "./../../../app/BaseComponent";
import {IdHomeComponent} from "../../../pages/id/home/home";
import {Config} from '../../../providers/Config';


@Component({
  selector: 'id-import',
  templateUrl: 'import.html',
})
export class IdImportComponent extends BaseComponent implements OnInit{
  public formFile: any;
  private reader: FileReader;
  private file: File;
  private kycObj:any={};
  ngOnInit(){
      this.setTitleByAssets('text-id-import');
      this.kycObj = Config.getKycObj();
      this.reader = new FileReader();
      if(this.isEmptyObject(this.kycObj)){
           this.localStorage.get('kyc').then((val)=>{
          if(val === null){
            Config.setKycObj(JSON.parse(val));
          }else{
             Config.setKycObj(JSON.parse(val));
          }
           });
            return;
        }

  }

  public fileChangeEvent($event: any) {

    this.file = $event.target ? $event.target.files[0] : $event.srcElement.files[0];
    this.formFile = $event.target.value;
    console.log("==========="+this.formFile);
    console.log("==========="+this.file);
    this.reader.readAsBinaryString(this.file);
    this.getFile();
  }

  private getFile() {
    // If we use onloadend, we need to check the readyState.
    this.reader.onloadend = (evt: any) => {
      if (evt.target.readyState == 2) { // DONE == 2
        console.log("ssss======"+evt.target.result);
        let addObjs = JSON.parse(evt.target.result);
        for(let key of addObjs){
          this.kycObj[key] =  addObjs[key];
        }
        this.localStorage.set('kyc',this.kycObj).then((val)=>{
             this.messageBox('text-exprot-sucess-message');
        });
      }
    }
  }

  onImport(){
    this.Go(IdHomeComponent);
  }
}
