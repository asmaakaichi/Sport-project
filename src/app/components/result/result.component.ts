import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
commentForm:FormGroup;
comment:any={};
id:any;
commentsTab:any=[];
  @Input() matchInput: any;
  @Output() matchEmitter:EventEmitter<any> = new EventEmitter()
  constructor( private matchService:MatchService) { }

  ngOnInit() {
  this.id=localStorage.getItem("userId");
  }
  addComment(){
this.comment.userId=this.id;
this.comment.matchId= this.matchInput._id;
this.matchService.addComment(this.comment).subscribe((data)=>{
  console.log(data.message);
  this.matchService.getComments().subscribe((data)=>{
    console.log("Here data", data.matches);
    this.matchEmitter.emit(data.matches);
  })
});


  }

  scoreColor(s1, s2) {
    if (s1 > s2) {
      return "green";
    } else if (s1 < s2) {
      return "orange";
    } else {
      return "blue";
    }
  }

}
