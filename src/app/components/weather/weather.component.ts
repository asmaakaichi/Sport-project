import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
weather:any={};
searchForm:FormGroup;
result:any;

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
    
  }
  search(){
    this.weatherService.search(this.weather).subscribe((data)=>{
      console.log("Here key from BE", data.result);
      this.result=data.result;
    })
  }

 
}
