import { Component ,OnInit} from '@angular/core';
import {BaseComponent} from "../../../app/BaseComponent";
import {PathdetailsPage} from '../../../pages/id/pathdetails/pathdetails';
@Component({
  selector: 'page-pathlist',
  templateUrl: 'pathlist.html',
})
export class PathlistPage extends BaseComponent implements OnInit{
           private  parmar ={};
           public pathList = [
                               {"name":"text-identity","path":"identityCard"},
                               {"name":"text-certified-phone","path":"phone"},
                               {"name":"text-certified-card","path":"bankCard"},
                               {"name":"text-certified-company","path":"enterprise"}];
           ngOnInit(){
              this.parmar = this.getNavParams().data;
              this.setTitleByAssets("text-path-list");
           }
           onNext(item){
                this.parmar["path"] = item["path"];
                console.log("---path---"+JSON.stringify(this.parmar));
                this.Go(PathdetailsPage,this.parmar);
           }

}
