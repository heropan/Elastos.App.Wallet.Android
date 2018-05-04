import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';
import { Utils } from './../../../providers/Utils';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  // styleUrls: ['./my.component.scss']
})
export class MyComponent  extends BaseComponent implements OnInit  {


  ngOnInit() {
  }

  tiaozhuan( path: string): void {
    if (Utils.isNull(path)) {
        return;
    }
    this.router.Go_v2({'path': path});
   }

}
