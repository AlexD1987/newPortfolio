import { Component } from '@angular/core';
import { TranlateModule } from "../translate.module";

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [TranlateModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent {

}
