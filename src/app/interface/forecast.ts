import { City } from "./city";
import { ForecastListItem } from "./forecast-list-item";

export interface Forecast {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastListItem[];
    city: City;
}
