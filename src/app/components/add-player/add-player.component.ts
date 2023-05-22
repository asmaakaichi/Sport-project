import { Router } from '@angular/router';
import { generateId } from 'src/app/shared/generateId';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  playerForm: FormGroup;
  player: any = {};
  teams: any = [];
  constructor(private router: Router, private playerService:PlayerService) { }

  ngOnInit() {
    this.teams = JSON.parse(localStorage.getItem("teams") || "[]");
  }
  addPlayer() {
   this.playerService.addPlayer(this.player).subscribe((data)=>{
    console.log("Here data from BL", data.message);
    this.router.navigate(["admin"])
   });
  }

}
