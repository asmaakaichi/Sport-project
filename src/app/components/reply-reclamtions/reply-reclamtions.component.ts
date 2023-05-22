import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reply-reclamtions',
  templateUrl: './reply-reclamtions.component.html',
  styleUrls: ['./reply-reclamtions.component.css']
})
export class ReplyReclamtionsComponent implements OnInit {
replyForm:FormGroup;
reply:any={};
id:any;
  constructor(private reclamationService:ReclamationService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }
  replayToreclamtion(){
  this.reply.reclamationId=localStorage.getItem("reclamationId");
  this.reply.userId= this.activatedRoute.snapshot.paramMap.get("id2");
  this.reclamationService.replyReclamation(this.reply).subscribe((data)=>{
  console.log("Here reply added", data.isAdded);
  
  })
  
  }
}
