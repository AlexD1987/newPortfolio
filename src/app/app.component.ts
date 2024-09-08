import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { HeaderComponent } from "./header/header.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { MySkillsComponent } from "./my-skills/my-skills.component";
import { MyProjectsComponent } from "./my-projects/my-projects.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { TranlateModule } from './translate.module';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, TranlateModule, LandingPageComponent, HeaderComponent, AboutMeComponent, MySkillsComponent, MyProjectsComponent, ContactComponent, FooterComponent]
})
export class AppComponent implements OnInit {
    private readonly LANG_KEY = 'selectedLanguage';

    constructor(private translate: TranslateService) { }

    ngOnInit(): void {

    }

    title = 'myPortfolio';
}
