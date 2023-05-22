
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StadiumService } from 'src/app/services/stadium.service';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {

  stadiumForm: FormGroup;
  stadium: any = {};
  constructor(private router: Router, private stadiumService:StadiumService) { }

  ngOnInit() {
  }

  addStadium(){
    this.stadiumService.addStadium(this.stadium).subscribe((data)=>{
      console.log("Here data from BE", data.message );
      this.router.navigate(["admin"]);
    })
  }
}
