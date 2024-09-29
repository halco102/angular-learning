import { WeatherData } from "./weather-data";

export interface WeatherDataWithLocation {
    locationData: Location;
    cityWeatherData: WeatherData;
    locationName: string;
}
