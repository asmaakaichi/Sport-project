import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playersTab: any = []
  constructor( private playerService:PlayerService) { }

  ngOnInit() {
    this.playerService.getAllplayers().subscribe((data)=>{
      console.log("Here response", data);
      this.playersTab=data.playersArray;
    });
  }

}
