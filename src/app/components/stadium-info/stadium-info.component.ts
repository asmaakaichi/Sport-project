import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StadiumService } from 'src/app/services/stadium.service';

@Component({
  selector: 'app-stadium-info',
  templateUrl: './stadium-info.component.html',
  styleUrls: ['./stadium-info.component.css']
})
export class StadiumInfoComponent implements OnInit {
id:any;
stadium:any;
  constructor(private activatedRoute:ActivatedRoute, private stadiumService:StadiumService) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.stadiumService.getStadiumById(this.id).subscribe((data)=>{
      console.log("Here stadium obj", data);
      this.stadium=data.stadium;
    })
  }

}
