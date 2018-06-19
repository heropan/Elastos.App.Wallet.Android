import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
//import {HomeComponent} from "../../tabs/home/home.component";
import {TabsComponent} from "../../tabs/tabs.component";
//import {Logger} from "../../../providers/Logger";
import {Util} from "../../../providers/Util";
import * as _ from 'lodash';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  // styleUrls: ['./write.component.scss']
})
export class WriteComponent extends BaseComponent implements OnInit {


  mnemonicList: Array<any> = []
  selectList: Array<any> = [];
  mnemonicStr: string;
  selectComplete = false;
  onItem(type, index) {

    if (type === 0) { // 取消添加
      this.mnemonicList.push(this.selectList.splice(index, 1)[0]);
    } else {          // 添加
      this.selectList.push(this.mnemonicList.splice(index, 1)[0]);
      // console.log(this.selectList);
    }

  }

  ngOnInit() {
    this.setTitleByAssets('text-mnemonic-check');
    this.mnemonicStr = this.getNavParams().get("mnemonicStr");
    //this.mnemonicStr = "aa aa aa aa aa aa aa aa aa aa aa aa";
    this.mnemonicList = this.getNavParams().get("mnemonicList").sort(function(){ return 0.5 - Math.random() });
    //this.mnemonicList = ["eye","aa","ss","ss","aa","aa","aa","aa","aa","aa","aa","aa"];
    //this.mnemonicList = this.getNavParams().get("mnemonicList");
    alert("this.mnemonicList ====="+JSON.stringify(this.mnemonicList));
    //this.mnemonicList = this.shuffledWords(this.mnemonicList);
    //this.mnemonicList = ["sss","ddd","cccc"];
    // console.log(this.mnemonicList)
  }

  onNext() {
    let mn = "";
    for(let i =0;i<this.selectList.length;i++){
      mn += this.selectList[i].text;
    }
    if(!Util.isNull(mn) && mn == this.mnemonicStr.replace(/\s+/g,"")){
      this.toast('text-mnemonic-ok');
      this.Go(TabsComponent)
    }else{
      this.toast('text-mnemonic-prompt3');
    }
  }

  public addButton(index: number, item: any): void {
    var newWord = {
      text: item.text,
      prevIndex: index
    };
    this.selectList.push(newWord);
    this.mnemonicList[index].selected = true;
    this.shouldContinue();
  }



  public removeButton(index: number, item: any): void {
    // if ($scope.loading) return;
    this.selectList.splice(index, 1);
    this.mnemonicList[item.prevIndex].selected = false;
    this.shouldContinue();
  }

  private shouldContinue(): void {
    this.selectComplete = this.selectList.length === this.mnemonicList.length ? true : false;
  }

  private shuffledWords(words: string[]) {
    var sort = _.sortBy(words);

    return _.map(sort, (w) => {
      return {
        text: w,
        selected: false
      };
    });
  }

}
