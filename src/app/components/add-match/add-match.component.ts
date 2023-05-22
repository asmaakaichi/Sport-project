import { generateId } from 'src/app/shared/generateId';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  // match : object
  match: any = {};
  // matchForm: Form Id
  matchForm: FormGroup;
  constructor(private matchService:MatchService, private router:Router) { }

  ngOnInit() {
  }

  // Method
  addMatch() {
   this.matchService.addMatch(this.match).subscribe((data)=>{ 
    console.log("Here data from BE", data.message)})
  this.router.navigate(["admin"]);
  }




}
