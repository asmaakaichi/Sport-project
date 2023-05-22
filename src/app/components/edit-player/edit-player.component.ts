import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
id:any;
players:any=[];
player:any={};
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private playerService:PlayerService) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.playerService.getPlayerById(this.id).subscribe((data)=>{
    this.player=data.player
    })
  }
  editPlayer(){
    this.playerService.editPlayer(this.player).subscribe((data)=>{
    console.log("Here data after edit", data);
    });
    this.router.navigate(["admin"]);
  }
}
