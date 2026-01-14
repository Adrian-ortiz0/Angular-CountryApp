import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {
  
  countries = input.required<Country[]>();

  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

 }
