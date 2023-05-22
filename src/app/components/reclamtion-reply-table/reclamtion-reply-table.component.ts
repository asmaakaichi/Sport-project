import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamtion-reply-table',
  templateUrl: './reclamtion-reply-table.component.html',
  styleUrls: ['./reclamtion-reply-table.component.css']
})
export class ReclamtionReplyTableComponent implements OnInit {
  userReclamations:any=[];
  userReplies:any=[];
  id:any;
  reclamationId:any;
  constructor(private reclamtionService:ReclamationService) { }

  ngOnInit() {
  this.id= localStorage.getItem("userId");
  this.reclamationId=localStorage.getItem("reclamationId");

  this.reclamtionService.getAllUserReclamations(this.id).subscribe((data)=>{
    this.userReclamations=data.reclamations;
  });
  this.reclamtionService.getAllUserReplyToReclamation(this.id, this.reclamationId).subscribe((data)=>{
this.userReplies=data.reply;
console.log("Here reply", data.reply);
  })
  }

}
