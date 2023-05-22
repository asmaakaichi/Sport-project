import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
players:any=[];
player:any={};
id:any;
  constructor(private playerService:PlayerService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.playerService.getPlayerById(this.id).subscribe((data)=>{
    console.log("Here player obj", data);
    this.player=data.player
    })
  }

}
