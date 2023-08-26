import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country, Region, SmallCountryData } from '../interfaces/country.interfaces';
import { Observable, combineLatest, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {

    private baseUrl = "https://restcountries.com/v3.1";

    private _regions: Region[] = [Region.Africa, Region.America, Region.Asia, Region.Europe, Region.Oceania]

    constructor(private httpClient: HttpClient) { }

    get regions(): Region[] {
        return [... this._regions];
    }

    getCountriesByRegion(region: Region): Observable<SmallCountryData[]> {
        if (!region) return of([]);

        const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

        return this.httpClient.get<Country[]>(url)
            .pipe(
                map(countries => countries.map(country => ({
                    name: country.name,
                    cca3: country.cca3,
                    borders: country.borders ?? []
                })))
            );
    }

    getCountryByAlphaCode(cca3: string): Observable<SmallCountryData> {
        if (!cca3) return of();

        const url = `${this.baseUrl}/alpha/${cca3}?fields=cca3,name,borders`;

        return this.httpClient.get<Country>(url)
            .pipe(
                map(country => ({
                    name: country.name,
                    cca3: country.cca3,
                    borders: country.borders ?? []
                }))
            );
    }
    getBorderCountriesByCode(borders: string[]): Observable<SmallCountryData[]> {
        if (!borders.length) return of([])

        const countriesRequest: Observable<SmallCountryData>[] = []

        borders.forEach( code => {
            countriesRequest.push( this.getCountryByAlphaCode(code) )
        });

        return combineLatest( countriesRequest );
    }

}