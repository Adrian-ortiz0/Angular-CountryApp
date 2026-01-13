import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);

  query = signal('');

  countryResource = resource({
    request: () => ({query: this.query()}),
    loader: async({request}) => {
      if(!request.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      )
    }
  })
 }
