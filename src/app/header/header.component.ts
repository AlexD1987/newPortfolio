import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranlateModule } from "../translate.module";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranlateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuOpen: boolean = false;
  LANG_KEY: string | undefined;
  translatedEn: boolean = true;
  translatedDe: boolean = false;


  constructor(private translateService: TranslateService) { }



  async ngOnInit(): Promise<void> {
    /* await this.getLocalLang(); */
  }

  getLocalLang() {
    let loadedLang = localStorage.getItem('LANG_KEY');
    console.log(loadedLang);
    if (loadedLang === null || loadedLang === 'en') {
      localStorage.setItem('LANG_KEY', 'en');
      this.LANG_KEY = 'en';
      this.translateService.use(this.LANG_KEY);

    } else {
      this.LANG_KEY = loadedLang;
      this.translateService.use('de');

    }
  }

  switchLang(lang: string) {
    if (lang === 'en') {
      localStorage.setItem('LANG_KEY', 'de');
      this.translateService.use('en');
      this.translatedEn = true;
      this.translatedDe = false;
    } else {
      localStorage.setItem('LANG_KEY', 'en');
      this.translateService.use('de');
      this.translatedDe = true;
      this.translatedEn = false;
    }
  }

  toggleButton() {
    this.menuOpen = !this.menuOpen;
    console.log(this.menuOpen);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
