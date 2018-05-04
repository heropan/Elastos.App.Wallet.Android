import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './../../../app/BaseComponent';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  // styleUrls: ['./address.component.scss']
})
export class AddressComponent extends BaseComponent implements OnInit {

  addrList = [
    {id: '', address: 'Exbwononlxnknwlnblnwb'},
    {id: '', address: 'Exbwononlxnknwlnblnwb'},
    {id: '', address: 'Exbwononlxnknwlnblnwb'},
    {id: '', address: 'Exbwononlxnknwlnblnwb'},
    {id: '', address: 'Exbwononlxnknwlnblnwb'},
    {id: '', address: 'Exbwononlxnknwlnblnwb'},
    {id: '', address: 'Exbwononlxnknwlnblnwb'}
  ];

  ngOnInit() {
    this.setTitleByAssets('text-contacts-address');
  }

  onItem() {

  }
}
