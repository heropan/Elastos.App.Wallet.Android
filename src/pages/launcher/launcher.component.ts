import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../app/BaseComponent';

@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
  // styleUrls: ['./launcher.component.scss']
})
export class LauncherComponent extends BaseComponent implements OnInit {


  ngOnInit() {
  }

  onNext(type) {
    if (type === 1) {
      this.router.Go_v2({path: '/wallet/create'});
    } else {
      this.router.Go_v2({path: '/wallet/import'});
    }
  }

}
