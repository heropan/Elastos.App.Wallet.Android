import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
@Component({
  selector: 'page-pathdetails',
  templateUrl: 'pathdetails.html',
})
export class PathdetailsPage extends BaseComponent implements OnInit{

     ngOnInit(){
      this.setTitleByAssets("text-path-deatils");
     }
     onCommit(){

     }
}
