import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [
    trigger('titleOneAnimation', [
      state('inactive', style({
        transform: 'translateX(1600px)' // Start position
      })),
      state('active', style({
        transform: 'translateX(0)' // End position
      })),
      transition('inactive => active', animate('1.4s ease-in-out')),
      transition('active => inactive', animate('1.4s ease-in-out'))
    ]),
    trigger('titleTwoAnimation', [
      state('inactive', style({
        transform: 'translateX(-1600px)' // Start position
      })),
      state('active', style({
        transform: 'translateX(0)' // End position
      })),
      transition('inactive => active', animate('1.4s ease-in-out')),
      transition('active => inactive', animate('1.4s ease-in-out'))
    ]),
    trigger('titleNameAnimation', [
      state('inactive', style({
        transform: 'translateY(800px)' // Start position
      })),
      state('active', style({
        transform: 'translateY(0)' // End position
      })),
      transition('inactive => active', animate('2.5s ease-in-out')),
      transition('active => inactive', animate('2.5s ease-in-out'))
    ])
  ]
})


export class LandingPageComponent implements OnInit {
  titleOneState: string = 'inactive';
  startTitle: boolean = false;
  titleTwoState: string = 'inactive';
  slideBorder: boolean = false;
  nameSlideIn: string = 'inactive';
  startArrow: boolean = false;
  openMenu: boolean = false;

  constructor(private http: HttpClient, private translateService: TranslateService) {
    // Optional: Standardsprache setzen
    translateService.setDefaultLang('en');
  }



  ngOnInit(): void {
    setTimeout(() => {
      this.titleOneState = 'active';
      this.startTitle = true;
    }, 1000);
    setTimeout(() => {
      this.titleTwoState = 'active';
    }, 1000);
    setTimeout(() => {
      this.nameSlideIn = 'active';
    }, 1600);
    setTimeout(() => {
      this.slideBorder = true;
    }, 4600);
    setTimeout(() => {
      this.startArrow = true;
    }, 7000);
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new HttpLoader(http, './assets/i18n'),
        deps: [HttpClient],
      },
    })
  ]
})
