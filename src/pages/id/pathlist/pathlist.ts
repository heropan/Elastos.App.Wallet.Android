import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {PathdetailsPage} from '../../../pages/id/pathdetails/pathdetails';
@Component({
  selector: 'page-pathlist',
  templateUrl: 'pathlist.html',
})
export class PathlistPage extends BaseComponent implements OnInit{
           public pathList = [
                               {"name":"text-identity","path":"identityCard"},
                               {"name":"text-certified-phone","path":"phone"},
                               {"name":"text-certified-card","path":"bankCard"},
                               {"name":"text-certified-company","path":"enterprise"}];
           ngOnInit(){
              this.setTitleByAssets("text-path-list");
           }
           onNext(item){
                this.Go(PathdetailsPage);
           }

}
