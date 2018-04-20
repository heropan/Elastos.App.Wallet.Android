import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.less']
})
export class WriteComponent extends BaseComponent implements OnInit {


  mnemonicList: Array<any> = [
    {text: '醉', select: true},
    {text: '酒', select: true},
    {text: '当', select: true},
    {text: '歌', select: true},
    {text: '人', select: true},
    {text: '生', select: true},
    {text: '几', select: true},
    {text: '和', select: true},
    {text: '哎', select: true},
    {text: '呦', select: true},
  ];

  selectList: Array<any> = [];

  onItem(type, index) {

    if (type === 0) { // 取消添加
      this.mnemonicList.push(this.selectList.splice(index, 1)[0]);
    } else {          // 添加
      this.selectList.push(this.mnemonicList.splice(index, 1)[0]);
      console.log(this.selectList);
    }

  }


  ngOnInit() {
    this.setTitleByAssets('text-mnemonic-check');
  }


  onNext() {
    this.router.Go('/home');
  }

}
