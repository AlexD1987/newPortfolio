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
  translated: boolean = false;

  constructor(private translateService: TranslateService) { }



  async ngOnInit(): Promise<void> {
    await this.getLocalLang();
  }

  getLocalLang() {
    let loadedLang = localStorage.getItem('LANG_KEY');
    console.log(loadedLang);
    if (loadedLang === null || loadedLang === 'en') {
      localStorage.setItem('LANG_KEY', 'en');
      this.LANG_KEY = 'en';
      this.translateService.use(this.LANG_KEY);
      this.translated = false;
      console.log(this.translated);
    } else {
      this.LANG_KEY = loadedLang;
      this.translateService.use('de');
      this.translated = true;
      console.log(this.translated);
    }
  }

  switchLang() {
    console.log(this.LANG_KEY);
    if (this.LANG_KEY === 'en') {
      localStorage.setItem('LANG_KEY', 'de');
    } else {
      localStorage.setItem('LANG_KEY', 'en');
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
