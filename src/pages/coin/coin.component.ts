import {BaseComponent} from '../../app/BaseComponent';
import {Component, ViewEncapsulation, OnInit} from '@angular/core';


@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CoinComponent extends BaseComponent implements OnInit {


  transferList = [
    {},
    {},
    {}
  ];

  coinCount = 1.2;

  coinId = 0;


  ngOnInit() {
    this.setTitle('ELA');
  }

  onItem(item) {
    this.router.Go_v2({path: '/coin/' + this.coinId + '/record'});
  }

  onNext(type) {
    switch (type) {
      case 1:
        this.router.Go_v2({path: '/coin/' + this.coinId + '/receive'});
        break;
      case 2:
        this.router.Go_v2({path: '/coin/' + this.coinId + '/transfer'});
        break;
    }
  }


}
