import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html',
  styleUrls: ['./mnemonic.component.less']
})
export class MnemonicComponent extends BaseComponent implements OnInit {


  mnemonicList = [
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

  ngOnInit() {
    this.setTitleByAssets('text-mnemonic');
  }

  onNext() {
    this.router.Go('/mnemonic/write');
  }
}
