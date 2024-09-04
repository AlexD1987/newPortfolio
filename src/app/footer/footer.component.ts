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

    openImprint() {
        this.imprintOpen = true;
    }

    closeImprint() {
        this.imprintOpen = false;
    }
}
