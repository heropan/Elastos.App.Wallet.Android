import { Component, OnInit } from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  // styleUrls: ['./result.component.scss']
})
export class ResultComponent  extends BaseComponent implements OnInit  {
  type: string;
  ngOnInit() {
    this.type = this.activateRoute.snapshot.params['type'];
  }

  back(): void {
    this.router.Go_v2({'path': '/home'});
  }

}
