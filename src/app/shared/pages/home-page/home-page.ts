import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
})
export class HomePage { }
