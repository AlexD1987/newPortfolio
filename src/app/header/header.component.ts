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

    /**
     * Initializes the component's logic by checking the responsive view and setting the `responsiveView` flag accordingly.
     */
    ngOnInit(): void {
        this.checkResponsiveView();
    }

    /**
     * Initializes responsive design logic after the component's view has been initialized.
     */
    ngAfterViewInit(): void {
        this.checkResponsiveView();
    }

    /**
     * Handles window resize events and calls the `checkResponsiveView` method to adjust the component's layout accordingly.
     */
    @HostListener('window:resize')
    onResize() {
        this.checkResponsiveView();
    }

    /**
     * Switches the language of the application based on the provided language code.

     * @param {string} lang - The language code to switch to (either 'en' or 'de').
     */
    switchLang(lang: string) {
        if (lang === 'en') {
            this.translateService.use('en');
            this.translatedEn = true;
            this.translatedDe = false;
        } else {
            this.translateService.use('de');
            this.translatedDe = true;
            this.translatedEn = false;
        }
    }

    /**
     * Toggles the `menuOpen` flag, which can be used to control the visibility of a menu or other UI elements.
     */
    toggleButton() {
        this.menuOpen = !this.menuOpen;
    }

    /**
     * Checks the screen width and sets the `responsiveView` flag accordingly.

     * @param {number} screenWidth - The current screen width in pixels (optional, as it can be retrieved within the method).
     */
    checkResponsiveView() {
        let screenWidth = window.innerWidth;

        if (screenWidth <= 900) {
            this.responsiveView = true;
        } else {
            this.responsiveView = false;
        }
    }
}
