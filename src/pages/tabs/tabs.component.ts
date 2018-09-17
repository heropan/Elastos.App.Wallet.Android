import { Component } from '@angular/core';
import { HomeComponent } from '../tabs/home/home.component';
import { MyComponent } from '../tabs/my/my.component';
@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {

  homeRoot = HomeComponent;
  settingsRoot =  MyComponent;
  constructor() {

  }
}
