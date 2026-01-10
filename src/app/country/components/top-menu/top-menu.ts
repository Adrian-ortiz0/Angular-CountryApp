import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-top-menu',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './top-menu.html',
})
export class TopMenu { }
