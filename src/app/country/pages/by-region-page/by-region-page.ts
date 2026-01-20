import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam(queryParam: string): Region{
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic'
  };

  return validRegions[queryParam] ?? 'Americas'

}

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
  
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));
  
  selectRegion(region: Region) {
   this.selectedRegion.set(region);
  }
  countryResource = rxResource({
    request: () => ({query: this.selectedRegion()}),
    loader: ({request}) => {
      if(!request.query) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.query,
        }
      })
      return this.countryService.searchByRegion(request.query);
    }
  })
 }
