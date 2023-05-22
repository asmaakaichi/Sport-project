import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
id:any;
team:any={};
teams:any=[];
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private teamService:TeamService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.teamService.getTeamById(this.id).subscribe((data)=>{
      this.team=data.team;
    })

}
editTeam(){
  this.teamService.editTeam(this.team).subscribe((data)=>{
    console.log("Here data after edit", data);
  });
  this.router.navigate(["admin"]);
}
}