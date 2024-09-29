export interface SearchService<T>{
    searchResult(search : string) : T;
}