import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

export interface AirPollutionData {
  Eindex: number;
  pm2_5: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
  co: number;
}

@Component({
  selector: 'app-feature2',
  standalone: false,
  templateUrl: './feature2.component.html',
  styleUrl: './feature2.component.css'
})
export class Feature2Component implements OnInit{

  airPollutionData: AirPollutionData | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  getAirPollutionData(cityName: string) {

    if (cityName.trim() === "") {
      alert("Please enter a city name")
      return;
    }

    const apiUrl = `http://localhost:6150/air-pollution/${cityName}`;
    this.http.get<AirPollutionData>(apiUrl).subscribe( 
      (data) => {
        console.log('Air pollution data:', data);
        this.airPollutionData = data; 
        this.errorMessage = null;
      },
      (error) => {
        console.error('Error fetching air pollution data:', error);
        this.airPollutionData = null;
        this.errorMessage = error.error.error;
      }
    );
  }
}