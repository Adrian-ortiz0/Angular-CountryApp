import { Component, inject, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  countryService = inject(CountryService);
  selectedRegion = signal<Region|null>(null);
  
  selectRegion(region: Region) {
   this.selectedRegion.set(region);
  }
  countryResource = rxResource({
    request: () => ({query: this.selectedRegion()}),
    loader: ({request}) => {
      if(!request.query) return of([]);
      return this.countryService.searchByRegion(request.query);
    }
  })
 }
