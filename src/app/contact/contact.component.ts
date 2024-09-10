import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isEmail } from 'validator';
import { TranlateModule } from "../translate.module";
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranlateModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

    policyHref: string | undefined;

    constructor(private http: HttpClient, private translate: TranslateService) { }

    ngOnInit(): void {
        this.setPolicyHref();
        
        this.translate.onLangChange.subscribe(() => {
            this.setPolicyHref();
          });
    }

    validName: boolean | undefined;
    validMail: boolean | undefined;
    validMessage: boolean | undefined;
    completeMessage = false;
    triggerNameInput: boolean = false;
    triggerMailInput: boolean = false;
    triggerMessageInput: boolean = false;
    isChecked = false;

    contactData = {
        name: "",
        email: "",
        message: ""
    }

    @HostListener('window:keyup', ['$event'])
    listenInput(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement | HTMLTextAreaElement;
        
        if (event.type === 'keyup') {
            if (input.id === 'contactName') {
                this.triggerNameInput = true;
            } else if (input.id === 'contactMail') {
                this.triggerMailInput = true;
            } else if (input.id === 'contactMessage') {
                this.triggerMessageInput = true;
            }
        }
    }

    @HostListener('document: focusout', ['$event'])
    handleInputEvent(event: FocusEvent) {
        const input = event.target as HTMLInputElement | HTMLTextAreaElement;

        if (input) {
            if (input.id === 'contactName' && this.triggerNameInput) {
                this.handleNameInput(input);
            } else if (input.id === 'contactMail' && this.triggerMailInput) {
                this.handleMailInput(input);
            } else if (input.id === 'contactMessage' && this.triggerMessageInput) {
                this.handleMessageInput(input);
            }
        }
    }

    handleNameInput(input: any) {
        if (input.value === '') {
            this.validName = false;
        } else {
            this.validName = true;
        }
    }

    handleMailInput(input: any) {
        this.checkValidMail();
        if (input.value === '') {
            this.validMail = false;
        }
    }

    handleMessageInput(input: any) {
        if (input.value === '') {
            this.validMessage = false;
        } else {
            this.validMessage = true;
        }
    }

    toggleCheckBox() {
        this.isChecked = !this.isChecked;
    }

    contactForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', Validators.required)
    });

    post = {
        endPoint: 'https://alex-dause.de/sendMail.php',
        body: (payload: any) => JSON.stringify(payload),
        options: {
            headers: {
                'Content-Type': 'text/plain',
                responseType: 'text',
            },
        },
    };

    onSubmit(event: Event) {
        event.preventDefault();
        this.checkValidInput();
        this.checkValidMail();
        this.resetCheckBox();

        if (this.validName && this.validMail && this.validMessage) {
            this.sendMail();
        }
    }

    checkValidInput() {
        this.validName = this.contactData.name != '';
        this.validMail = this.contactData.email != '';
        this.validMessage = this.contactData.message != '';
    }

    checkValidMail() {
        const email = this.contactData.email;
        const validMailAdress = isEmail(email);
        this.validMail = validMailAdress || validMailAdress === undefined;
    }

    sendMail() {
        this.http.post(this.post.endPoint, this.post.body(this.contactData))
            .subscribe({
                next: (response) => {
                    // Handle successful response (e.g., show success message)
                    this.completeMessage = true;
                    this.contactForm.reset();
                    this.resetMailInput();
                },
                error: (error) => {
                    // Handle error (e.g., show error message)
                    console.error('Error sending email:', error);
                },
                complete: () => console.info('Send post complete'),
            });
    }

    resetMailInput() {
        this.isChecked = false;
        this.sendSuccess();
        setTimeout(() => {
            this.validName = undefined;
            this.validMail = undefined;
            this.validMessage = undefined;
            this.completeMessage = false;
        }, 4000);
    }

    resetCheckBox() {
        const checkbox = (document.getElementById('policyCheckBox') as HTMLInputElement);
        checkbox.checked = false;
    }

    sendSuccess() {
        const sendMessage = document.getElementById('contactMessage');
        
    }

    setPolicyHref() {
        const currentLang = this.translate.currentLang;
        
        if (currentLang === 'de') {
            this.policyHref = './assets/policy/policyDe.html';
        } else {
            this.policyHref = './assets/policy/policyEn.html';
        }
    }
}
