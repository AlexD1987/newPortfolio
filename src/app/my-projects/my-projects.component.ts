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
    /**
     * References to DOM elements for the reverse image, information, and border.
     *
     * These properties are used to access the native elements of these elements and manipulate their properties in the component's logic.
     */
    @ViewChild('reverseImage') reverseImage: ElementRef | undefined;
    @ViewChild('reverseInfo') reverseInfo: ElementRef | undefined;
    @ViewChild('reverseBorder') reverseBorder: ElementRef | undefined;

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void { }

    /**
     * Initializes responsive design logic after the component's view and its children's views have been fully initialized.
     *
     * This method is ideal for tasks that require access to DOM elements or manipulation of the view's layout, as it ensures that all child components and their views have been created and checked.
     */
    ngAfterViewInit(): void {
        this.responsiveDesign();
    }

    /**
     * Handles window resize events and calls the `responsiveDesign` method to adjust the component's layout accordingly.
     *
     * This method is triggered whenever the browser window is resized, allowing for dynamic updates to the component's appearance based on the available screen space.
     */
    @HostListener('window:resize')
    onResize() {
        this.responsiveDesign();
    }

    /**
     * Adjusts the component's layout based on the screen size.

     * This function is called when the window is resized or when the component is initially loaded.
     */
    responsiveDesign() {
        const screenWidth = window.innerWidth;
        const info = this.reverseInfo?.nativeElement;
        const image = this.reverseImage?.nativeElement;
        const border = this.reverseBorder?.nativeElement;

        this.handleResponsiveDesing(screenWidth, info, image, border);
    }

    /**
     * Handles responsive design, adjusting the classes of the information, image, and border elements based on the screen width.

     * @param {number} screenWidth - The current screen width in pixels.
     * @param {HTMLElement | null} info - The native element of the information, or null if it doesn't exist.
     * @param {HTMLElement | null} image - The native element of the image, or null if it doesn't exist.
     * @param {HTMLElement | null} border - The native element of the border, or null if it doesn't exist.
     */
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
