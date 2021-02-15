export interface City {
  name: string;
  longitude: number;
  latitude: number;
  temperature: number;
  title: string;
  timestamp: Date;
}
export interface LeftViewToday {
  name: string;
  temperature: number;
  timestamp: Date;
  title: string;
  humidity: number;
}
export interface RightViewToday {
  minTemp: number;
  maxTemp: number;
  windSpeed: number;
  windDirection: string;
  sunsetTime: string;
  sunriseTime: string;
  humidity: number;
}
export interface RightViewForecast {
  minTemp: number;
  maxTemp: number;
  day: string;
}
export interface RightViewHistory {
  temperature: number;
  sunsetTime: string;
  sunriseTime: string;
  day: string;
}
