import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  players: any = [];
  constructor(private router: Router, private playerService:PlayerService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.playerService.getAllplayers().subscribe((data)=>{
      this.players=data.playersArray;
    })
  }

  deletePlayer(id) {
    this.playerService.deletePlayer(id).subscribe((data)=>{
      console.log("Here isDeletedPlayer from BE", data.isDeleted);
      this.playerService.getAllplayers().subscribe((data)=>{
      this.players=data.playersArray;
      })
    });
  }
  goTodisplay(id){
this.router.navigate([`playerInfo/${id}`]);
  }
  goToEdit(id){
    this.router.navigate([`editPlayer/${id}`]);
  }

}
