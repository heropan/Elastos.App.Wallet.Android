import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../app/BaseComponent';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less']
})
export class RecordComponent extends BaseComponent implements OnInit {

  transferList = [
    {},
    {},
    {}
  ];



  ngOnInit() {
    this.setTitleByAssets('coin-recent-transfer');
  }

  onItem() {
    this.router.Go_v2({path: 'coin/0/record/0'});
  }

}
