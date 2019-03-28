import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TxtextPage } from './txtext';

@NgModule({
  declarations: [
    TxtextPage,
  ],
  imports: [
    IonicPageModule.forChild(TxtextPage),
    TranslateModule.forChild()
  ],
})
export class TxtextPageModule {}
