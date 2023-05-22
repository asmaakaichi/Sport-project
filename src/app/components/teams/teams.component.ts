import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
teamsTab: any=[];
  constructor(private teamService:TeamService) { }

  ngOnInit() {
    this.teamService.getAllteams().subscribe((data)=>{
      console.log("Here response team", data)
      this.teamsTab=data.teamsArray;
    })
  }

}
