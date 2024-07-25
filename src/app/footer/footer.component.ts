import { Component } from '@angular/core';
import { TranlateModule } from "../translate.module";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranlateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
