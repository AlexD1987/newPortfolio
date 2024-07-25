import { Component, OnInit, Renderer2, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { TranlateModule } from "../translate.module";

@Component({
    selector: 'app-my-projects',
    standalone: true,
    imports: [TranlateModule],
    templateUrl: './my-projects.component.html',
    styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent implements OnInit, AfterViewInit {
    @ViewChild('reverseImage') reverseImage: ElementRef | undefined;
    @ViewChild('reverseInfo') reverseInfo: ElementRef | undefined;
    @ViewChild('reverseBorder') reverseBorder: ElementRef | undefined;

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.responsiveDesign();
    }

    @HostListener('window:resize')
    onResize() {
        this.responsiveDesign();
    }

    private responsiveDesign() {
        const screenWidth = window.innerWidth;
        const info = this.reverseInfo?.nativeElement;
        const image = this.reverseImage?.nativeElement;
        const border = this.reverseBorder?.nativeElement;

        this.handleResponsiveDesing(screenWidth, info, image, border);
    }

    handleResponsiveDesing(screenWidth: number, info: any, image: any, border: any) {
        if (info) {
            if (screenWidth <= 1100) {
                this.renderer.removeClass(info, 'reverseInfo');
                this.renderer.removeClass(image, 'reverseImage');
                this.renderer.removeClass(border, 'reverseBorder');
                this.renderer.addClass(border, 'projectBorder');
            } else {
                this.renderer.addClass(info, 'reverseInfo');
                this.renderer.addClass(image, 'reverseImage');
                this.renderer.addClass(border, 'reverseBorder');
                this.renderer.removeClass(border, 'projectBorder');
            }
        }
    }
}
