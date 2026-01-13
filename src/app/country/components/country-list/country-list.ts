import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {
  
  countries = input.required<Country[]>();

 }
