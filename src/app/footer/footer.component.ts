import { Component, OnInit } from '@angular/core';
import { TranlateModule } from "../translate.module";

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [TranlateModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

    ngOnInit(): void {
    }

    imprintOpen: boolean = false;

    /**
     * Opens the imprint modal by setting the `imprintOpen` flag to true.
     */
    openImprint() {
        this.imprintOpen = true;
    }

    /**
     * Closes the imprint modal by setting the `imprintOpen` flag to false.
     */
    closeImprint() {
        this.imprintOpen = false;
    }
}
