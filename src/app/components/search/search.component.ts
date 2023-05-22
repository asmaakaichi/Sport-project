import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  match: any = {};
  findedMatches: any;
  matches: any = [];
  constructor(private matchService:MatchService) { }

  ngOnInit() {
    this.matches = JSON.parse(localStorage.getItem("matches") || "[]");
  }

  search() {
    
    this.matchService.Search(this.match).subscribe((data)=>{
      this.findedMatches=data.searchArray;
    })
  }

}
