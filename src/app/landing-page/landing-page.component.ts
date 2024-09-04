import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranlateModule } from "../translate.module";



@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [CommonModule, TranlateModule],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    /**
     * Animations for the component.
     *
     * Includes three triggers:
     *   - `titleOneAnimation`: Animates the first title element.
     *   - `titleTwoAnimation`: Animates the second title element.
     *   - `titleNameAnimation`: Animates the title name element.
     *
     * Each trigger defines states for 'inactive' and 'active', and transitions between these states with specified animations.
     */
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


export class LandingPageComponent implements OnInit, AfterViewInit {
    @ViewChild('border') border: ElementRef | undefined;

    titleOneState: string = 'inactive';
    startTitle: boolean = false;
    titleTwoState: string = 'inactive';
    slideBorder: boolean = false;
    nameSlideIn: string = 'inactive';
    startArrow: boolean = false;
    openMenu: boolean = false;

    constructor(private translateService: TranslateService, private renderer: Renderer2) { }

    /**
     * Initializes the component's logic by setting various state flags with delays to control the animations of different elements.

     * @param {number} delay - The delay in milliseconds before executing the callback function.
     */
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

    /**
     * Initializes responsive design logic after the component's view has been fully initialized.
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
     * Handles responsive design for the component, adjusting the layout based on the screen width and the visibility of the border element.

     * @param {number} screenWidth - The current screen width in pixels.
     * @param {HTMLElement | null} border - The native element of the border, or null if it doesn't exist.
     */
    responsiveDesign() {
        let screenWidth = window.innerWidth;
        let border = this.border?.nativeElement;

        this.handleResponsiveDesign(screenWidth, border);
    }

    /**
     * Handles responsive design, adjusting the visibility of the border element based on the screen width.

     * @param {number} screenWidth - The current screen width in pixels.
     * @param {HTMLElement | null} border - The native element of the border, or null if it doesn't exist.
     */
    handleResponsiveDesign(screenWidth: number, border: any) {
        if (screenWidth <= 1000) {
            this.renderer.addClass(border, 'd-none');
        } else {
            this.renderer.removeClass(border, 'd-none');
        }
    }
}
