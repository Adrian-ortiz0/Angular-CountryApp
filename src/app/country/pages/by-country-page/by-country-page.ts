import { Component, inject, input, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);

  query = signal('');

    countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([]);
      return this.countryService.searchByCountry(request.query);
    }
  })
  }
