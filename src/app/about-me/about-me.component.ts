import { Component, OnInit, Renderer2, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { TranlateModule } from "../translate.module";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-about-me',
    standalone: true,
    imports: [TranlateModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit, AfterViewInit {
    @ViewChild('responsiveImage') responsiveImage: ElementRef | undefined;
    @ViewChild('fullScreenImage') fullScreenImage: ElementRef | undefined;

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void { }

    /**
     * Initializes responsive design logic after the component's view has been initialized.
     */
    ngAfterViewInit(): void {
        this.responsiveDesign();
    }

    /**
     * Handles window resize events and calls the `responsiveDesign` method to adjust the component's layout accordingly.
     */
    @HostListener('window:resize')
    onResize() {
        this.responsiveDesign();
    }

    /**
     * Handles responsive design for the component, adjusting the layout based on the screen width and the visibility of the responsive and full-screen images.
     *
     * @param {number} screenWidth - The current screen width in pixels.
     * @param {HTMLElement | null} responsiveImage - The native element of the responsive image, or null if it doesn't exist.
     * @param {HTMLElement | null} fullScreenImage - The native element of the full-screen image, or null if it doesn't exist.
     */
    responsiveDesign() {
        let screenWidth = window.innerWidth;
        let responsiveImage = this.responsiveImage?.nativeElement;
        let fullScreenImage = this.fullScreenImage?.nativeElement;

        this.handleResponsiveDesign(screenWidth, responsiveImage, fullScreenImage);
    }

    /**
     * Handles responsive design, adjusting the visibility of the responsive and full-screen images based on the screen width.

     * @param {number} screenWidth - The current screen width in pixels.
     * @param {HTMLElement | null} responsiveImage - The native element of the responsive image, or null if it doesn't exist.
     * @param {HTMLElement | null} fullScreenImage - The native element of the full-screen image, or null if it doesn't exist.
     */
    handleResponsiveDesign(screenWidth: number, responsiveImage: any, fullScreenImage: any) {
        if (screenWidth <= 1100) {
            this.renderer.removeClass(responsiveImage, 'd-none');
            this.renderer.addClass(fullScreenImage, 'd-none');
            this.renderer.addClass(responsiveImage, 'responsiveImage');
        } else {
            this.renderer.removeClass(fullScreenImage, 'd-none');
            this.renderer.addClass(responsiveImage, 'd-none');
            this.renderer.removeClass(responsiveImage, 'responsiveImage');
        }
    }
}
