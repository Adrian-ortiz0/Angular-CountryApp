import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLowerCase().trim();
    
    return of([]);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      catchError(error => {
        console.log('Error fetching countries by capital:', error);
        return throwError(() => new Error(`Failed to fetch countries by capital ${query}`));
      })
    );
  }
  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase().trim();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((restCountries) => CountryMapper.mapRestCountriesToCountries(restCountries)),
      delay(2000),
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
}
