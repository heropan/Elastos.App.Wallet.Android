import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {WalltemodePage} from '../../pages/walltemode/walltemode';

@Component({
  selector: 'page-createmultiwallte',
  templateUrl: 'createmultiwallte.html',
})
export class CreatemultiwalltePage {
  public copayers: number[] =[1,2,3,4,5,6];
  public signatures: number[]=[1,2,3,4,5,6];
  public totalCopayers:number = 3;
  public requiredCopayers:number = 2;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatemultiwalltePage');
  }

  public setTotalCopayers(): void {
    console.log('====sssssssss====='+this.totalCopayers);
  }

  nextPage(){
      this.navCtrl.push(WalltemodePage,{totalCopayers:this.totalCopayers,requiredCopayers:this.requiredCopayers});
  }

}
