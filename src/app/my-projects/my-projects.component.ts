import { Component } from '@angular/core';
import { TranlateModule } from "../translate.module";

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [TranlateModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {

}
