import { Clouds } from "./clouds";
import { MainForecast } from "./main-forecast";
import { RainForecast } from "./rain-forecast";
import { SysForecast } from "./sys-forecast";
import { Weather } from "./weather";
import { Wind } from "./wind";

export interface ForecastListItem {
    dt: number;
    main: MainForecast;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: RainForecast;
    sys: SysForecast;
    dt_text: string;
}
