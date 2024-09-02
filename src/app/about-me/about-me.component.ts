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

    ngAfterViewInit(): void {
        this.responsiveDesign();
    }

    @HostListener('window:resize')
    onResize() {
        this.responsiveDesign();
    }

    private responsiveDesign() {
        let screenWidth = window.innerWidth;
        let responsiveImage = this.responsiveImage?.nativeElement;
        let fullScreenImage = this.fullScreenImage?.nativeElement;

        this.handleResponsiveDesign(screenWidth, responsiveImage, fullScreenImage);
    }

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
