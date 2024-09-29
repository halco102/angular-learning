import { Observable } from "rxjs";

export interface SearchService<T>{
    searchResult(search : string) : Observable<T>;
}