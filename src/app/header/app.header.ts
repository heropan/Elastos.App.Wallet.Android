import {Component, Input, OnInit} from '@angular/core';

import {Location} from '@angular/common';


/***
 * 标题栏
 * 引用方式 <app-header [header]="header"   ></app-header>
 * 可以通过 setTitle 和 setTitleByAssets 方法设置标题
 * 或 直接改变 header
 */
@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styleUrls: ['./app.header.less']
})
export class HeaderComponent {

  /**
   * 标题栏对象
   * @type {{title: string; show: boolean; rightIcon: string; backIcon: string; backCLick: () => void; rightClick: () => any}}
   */
  @Input('header')
  header: Header;



  public constructor(public location: Location) {
    this.header = new Header(location);
  }


}

export class Header {
  title: string;
  show: boolean;
  rightIcon: string;
  backIcon: string;
  backCLick: any;
  rightClick: any;
  location: Location;

  constructor(location: Location,
              title: string = '',
              show: boolean = true,
              backIcon: string = './assets/images/icon/icon-back-arrow.svg',
              rightIcon: string = '',
              backClick: any = () => location.back(),
              rightClick: any = '') {
    this.location = location;
    this.title = title;
    this.backIcon = backIcon;
    this.rightIcon = rightIcon;
    this.backCLick = backClick;
    this.rightClick = rightClick;
    this.show = show;
  }


  public getHeaderDisplay() {
    return this.show;
  }


  /**
   * 设置显示状态
   * @param {boolean} isShow
   */
  public setHeaderDisplay(isShow: boolean) {
    this.show = isShow;
  }


  public setTile(title: string) {
    this.title = title;
  }
}
