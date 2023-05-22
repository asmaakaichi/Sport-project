import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {

  teams: any = [];
  stadiums: any = [];
  findedStadium: any = {};
  constructor(private router: Router, private teamService:TeamService) { }

  ngOnInit() {
    this.teamService.getAllteams().subscribe((data)=>{
      this.teams=data.teamsArray;
    })
   
  }

  goToDisplay(id: any) {
    this.router.navigate([`teamInfo/${id}`]);
  }
  goToEdit(id:any){
    this.router.navigate([`editTeam/${id}`]);
  }

  searchStadium(x) {
    // for (let i = 0; i < this.stadiums.length; i++) {
    //   if (this.stadiums[i].id == id) {
    //     this.findedStadium = this.stadiums[i];
    //     break;
    //   }
    // }
    // return this.findedStadium;
    return this.stadiums.find((elt) => { return elt.id == x });
  }

  deleteTeam(id) {
    this.teamService.deleteTeam(id).subscribe((data)=>{
      console.log("Here response from BE", data.isDeleted);
      this.teamService.getAllteams().subscribe((data)=>{
        this.teams=data.teamsArray;
      })
    });
  }

}
