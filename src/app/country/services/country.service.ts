import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country, Region } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();


  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLowerCase().trim();
    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        console.log('Error fetching countries by capital:', error);
        return throwError(() => new Error(`Failed to fetch countries by capital ${query}`));
      })
    );
  }
  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase().trim();
    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(1000),
      catchError(error => {
        console.log('Error fetching countries by name:', error);
        return throwError(() => new Error(`Failed to fetch countries by name ${query}`));
      })
    );
  }
  searchCountryByAlphaCode(code: string){
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      map((countries) => countries.at(0)),
      catchError(error => {
        console.log('Error fetching countries by name:', error);
        return throwError(() => new Error(`Failed to fetch countries by code ${code}`));
      })
    );
  }
  searchByRegion(region: Region): Observable<Country[]>{
    if(this.queryCacheRegion.has(region)){
        return of(this.queryCacheRegion.get(region) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError(error => {
        console.log('Error fetching countries by name:', error);
        return throwError(() => new Error(`Failed to fetch regions by category ${region}`));
      })
    )
  }
}
