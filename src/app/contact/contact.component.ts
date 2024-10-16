import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isEmail } from 'validator';
import { TranlateModule } from "../translate.module";
import { TranslateService } from '@ngx-translate/core';
import { gsap } from "gsap";


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

    /**
     * Initializes the component, setting the policy link and subscribing to language change events.
     */
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
    currentLang: string = '';

    /**
     * @typedef {Object} ContactData
     * @property {string} name - Contact person's name
     * @property {string} email - Contact person's email
     * @property {string} message - Contact person's message
     */
    contactData = {
        name: "",
        email: "",
        message: ""
    }

    /**
     * Listens for keyup events on window and triggers corresponding input flags.
     * 
     * @param {KeyboardEvent} event - The keyboard event object.
     */
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

    /**
     * Handles focusout events on the document and triggers input handling based on input id.
     * 
     * @param {FocusEvent} event - The focus event object.
     */
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

    /**
     * Validates the name input and sets the validName flag.
     * 
     * @param {HTMLInputElement} input - The input element for the name field.
     */
    handleNameInput(input: any) {
        if (input.value === '') {
            this.validName = false;
        } else {
            this.validName = true;
        }
    }

    /**
     * Validates the mail input and sets the validMail flag. Also checks if the mail is valid.
     * 
     * @param {HTMLInputElement} input - The input element for the mail field.
     */
    handleMailInput(input: any) {
        this.checkValidMail();
        if (input.value === '') {
            this.validMail = false;
        }
    }

    /**
     * Validates the message input and sets the validMessage flag.
     * 
     * @param {HTMLInputElement} input - The input element for the message field.
     */
    handleMessageInput(input: any) {
        if (input.value === '') {
            this.validMessage = false;
        } else {
            this.validMessage = true;
        }
    }

    /**
     * Toggles the state of the isChecked flag.
     */
    toggleCheckBox() {
        this.isChecked = !this.isChecked;
    }

    /**
     * Defines the contact form with validation rules for name, email, and message fields.
     * 
     * @type {FormGroup}
     */
    contactForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', Validators.required)
    });

    /**
     * Represents a POST request configuration with endpoint, body serialization, and options.
     * 
     * @type {{ endPoint: string, body: (payload: any) => string, options: { headers: { 'Content-Type': string, responseType: string } } }}
     */
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

    /**
     * Handles the form submission, validating inputs and sending an email if valid.
     * 
     * @param {Event} event - The event object for the form submission.
     */
    onSubmit(event: Event) {
        event.preventDefault();
        this.checkValidInput();
        this.checkValidMail();
        this.resetCheckBox();

        if (this.validName && this.validMail && this.validMessage) {
            this.sendMail();
        }
    }

    /**
     * Checks the validity of the input fields and updates the corresponding validation flags.
     */
    checkValidInput() {
        this.validName = this.contactData.name != '';
        this.validMail = this.contactData.email != '';
        this.validMessage = this.contactData.message != '';
    }

    /**
     * Validates the email address from contactData and updates the validMail flag.
     */
    checkValidMail() {
        const email = this.contactData.email;
        const validMailAdress = isEmail(email);
        this.validMail = validMailAdress || validMailAdress === undefined;
    }

    /**
     * Sends the email using the configured POST request and handles the response.
     */
    sendMail() {
        this.http.post(this.post.endPoint, this.post.body(this.contactData))
            .subscribe({
                next: (response) => {
                    this.completeMessage = true;
                    this.contactForm.reset();
                    this.resetMailInput();
                },
                error: (error) => {
                    console.error();
                },
                complete: () => console.info(),
            });
    }

    /**
     * Resets the mail input state and validation flags after a successful send.
     * 
     * @returns {void}
     */
    resetMailInput() {
        this.isChecked = false;
        this.sendSuccess();
        setTimeout(() => {
            this.validName = undefined;
            this.validMail = undefined;
            this.validMessage = undefined;
            this.completeMessage = false;
        }, 17000);
    }

    /**
     * Resets the checkbox state for the policy agreement.
     * 
     * @returns {void}
     */
    resetCheckBox() {
        const checkbox = (document.getElementById('policyCheckBox') as HTMLInputElement);
        checkbox.checked = false;
    }

    /**
     * Displays a success message in the contact message textarea by animating text input.
     */
    sendSuccess() {
        const sendMessage = document.getElementById('contactMessage') as HTMLTextAreaElement;
        const message = this.checkMessageLang();

        if (sendMessage) {
            sendMessage.value = "";

            let currentText = "";
            const tl = gsap.timeline({ repeat: 0 });

            for (let i = 0; i < message.length; i++) {
                tl.to({}, {
                    duration: 0.15,
                    onComplete: () => {
                        currentText += message.charAt(i);
                        sendMessage.value = currentText;
                    }
                });
            }

            tl.to({}, { duration: 5 });

            for (let i = message.length - 1; i >= 0; i--) {
                tl.to({}, {
                    duration: 0.15,
                    onComplete: () => {
                        currentText = currentText.slice(0, -1);
                        sendMessage.value = currentText;
                    }
                });
            }
        }
    }

    /**
     * Sets the policy document link based on the current language.
     */
    setPolicyHref() {
        const currentLang = this.translate.currentLang;

        if (currentLang === 'de') {
            this.policyHref = './assets/policy/policyDe.html';
            this.currentLang = 'de';
        } else {
            this.policyHref = './assets/policy/policyEn.html';
            this.currentLang = 'en';
        }
    }

    /**
     * Returns a success message based on the current language setting.
     * 
     * @returns {string} The success message in the appropriate language.
     */
    checkMessageLang() {
        if (this.currentLang === 'en') {
            return 'Thanks for your message!'
        } else {
            return 'Vielen dank für deine Nachricht!'
        }
    }
}
