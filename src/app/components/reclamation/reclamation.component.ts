import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamationForm:FormGroup;
  errorMsg:string;
userReclamations:any=[];
id:any;
  constructor(private reclamationService:ReclamationService, private fromBuilder:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.id= localStorage.getItem("userId");
  // this.reclamationService.getAllUserReclamations(this.id).subscribe((data)=>{
  //   this.userReclamations=data.reclamations;
  // })
    this.reclamationForm=this.fromBuilder.group({
      subject:["", [Validators.required]],
      description:[""]
    })
  }
  send(){
    this.reclamationForm.value.userId =this.id
    this.reclamationService.send(this.reclamationForm.value).subscribe((data)=>{
    console.log(data.isAdded);
    });
    this.reclamationService.getAllUserReclamations(this.id).subscribe((data)=>{
      this.userReclamations=data.reclamations;
    })
  }
  reply(id1:any, id2:any){
localStorage.setItem("reclamationId",id1)
this.router.navigate([`replayReclamations/${id2}`]);
  }
}
