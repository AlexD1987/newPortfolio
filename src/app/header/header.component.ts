import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, Renderer2, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
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
export class HeaderComponent implements OnInit, AfterViewInit {
    menuOpen: boolean = false;
    responsiveView: boolean = false;
    LANG_KEY: string | undefined;
    translatedEn: boolean = true;
    translatedDe: boolean = false;


    constructor(private translateService: TranslateService) { }

    ngOnInit(): void {
        this.checkResponsiveView();
    }

    ngAfterViewInit(): void {
        this.checkResponsiveView();
    }

    @HostListener('window:resize')
    onResize() {
        this.checkResponsiveView();
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

    checkResponsiveView() {
        let screenWidth = window.innerWidth;

        if (screenWidth <= 900) {
            this.responsiveView = true;
        } else {
            this.responsiveView = false;
        }
    }
}
