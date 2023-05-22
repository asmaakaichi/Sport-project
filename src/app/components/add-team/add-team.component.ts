import { Router } from '@angular/router';
import { generateId } from 'src/app/shared/generateId';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  teamForm: FormGroup;
  team: any = {};
  stadiums: any = [];
  constructor(private router: Router, private teamService:TeamService) { }

  ngOnInit() {
  }

  addTeam() {
    this.teamService.addTeam(this.team).subscribe((data)=>{
      console.log("Here data from BE", data.message);
      this.router.navigate(["admin"])
    });
  }

}
