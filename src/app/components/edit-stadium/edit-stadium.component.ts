import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StadiumService } from 'src/app/services/stadium.service';

@Component({
  selector: 'app-edit-stadium',
  templateUrl: './edit-stadium.component.html',
  styleUrls: ['./edit-stadium.component.css']
})
export class EditStadiumComponent implements OnInit {
id:any;
stadium:any={};
  constructor(private activatedRoute:ActivatedRoute, private stadiumService:StadiumService, private router:Router) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.stadiumService.getStadiumById(this.id).subscribe((data)=>{
      this.stadium=data.stadium;
    })
  }
  EditStadium(){
this.stadiumService.editStadium(this.stadium).subscribe((data)=>{
  console.log("Here data after edit", data);
  this.router.navigate(["admin"]);
});
  }
}
