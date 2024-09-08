import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isEmail } from 'validator';
import { TranlateModule } from "../translate.module";


@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranlateModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    constructor(private http: HttpClient) { }

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
                console.log(this.triggerNameInput);
            } else if (input.id === 'contactMail') {
                this.triggerMailInput = true;
                console.log(this.triggerMailInput)
            } else if (input.id === 'contactMessage') {
                this.triggerMessageInput = true;
                console.log(this.triggerMessageInput)
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
            console.log(this.isChecked);
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
        console.log(this.isChecked);
    }

    contactForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', Validators.required),
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
        console.log(this.isChecked);

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
        console.log(validMailAdress);
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
        setTimeout(() => {
            this.validName = undefined;
            this.validMail = undefined;
            this.validMessage = undefined;
            this.completeMessage = false;
        }, 4000);
    }
}
