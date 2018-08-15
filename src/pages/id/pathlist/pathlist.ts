import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../../app/BaseComponent";

@Component({
  selector: 'page-pathlist',
  templateUrl: 'pathlist.html',
})
export class PathlistPage extends BaseComponent implements OnInit{

           ngOnInit(){
              this.setTitleByAssets("text-path-list");
           }

}
