import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

@Component({
  selector: 'app-inputcomponent',
  standalone: false,
  templateUrl: './inputcomponent.component.html',
  styleUrl: './inputcomponent.component.css'
})
export class InputcomponentComponent implements OnInit{

  weather: WeatherData | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  getWeather(cityName: string) {

    if (cityName.trim() === "") {
      alert("Please enter a city name")
      return;
    }

    const apiUrl = `http://localhost:6150/getweather?q=${cityName}`;
    this.http.get<WeatherData>(apiUrl).subscribe( 
      (data) => {
        console.log('Weather data:', data);
        this.weather = data; 
        this.errorMessage = null;
      },
      (error) => {
        console.error('Error fetching weather:', error);
        this.weather = null;
        this.errorMessage = error.error.error;
      }
    );
  }
}
