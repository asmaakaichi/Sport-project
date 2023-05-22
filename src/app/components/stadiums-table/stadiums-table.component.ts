
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StadiumService } from 'src/app/services/stadium.service';

@Component({
  selector: 'app-stadiums-table',
  templateUrl: './stadiums-table.component.html',
  styleUrls: ['./stadiums-table.component.css']
})
export class StadiumsTableComponent implements OnInit {
stadiums:any=[];
  constructor(private stadiumService:StadiumService, private router:Router) { }

  ngOnInit() {
    this.stadiumService.getAllstadiums().subscribe((data)=>{
      this.stadiums=data.stadiumsArray;
    })
  }
  goToDisplay(id:any){
this.router.navigate([`stadiumInfo/${id}`]);
  }
  goToEdit(id:any){
    this.router.navigate([`editStadium/${id}`]);
  }
  deleteStadium(id:any){
  this.stadiumService.deleteStadium(id).subscribe((data)=>{
    console.log("Here response from BE", data.isDeleted);
    this.stadiumService.getAllstadiums().subscribe((data)=>{
      this.stadiums=data.stadiumsArray;
    })
  })
  }

}
