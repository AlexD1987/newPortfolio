import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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

    /**
     * An object representing contact data, including name, email, and message.
     */
    contactData = {
        name: "",
        email: "",
        message: ""
    }

    /**
     * Creates a FormGroup instance named `contactForm` to handle form validation for contact data.
     *
     * The form group includes the following controls:
     *  - `name`: A FormControl with a required validator.
     *  - `email`: A FormControl with required and email validators.
     *  - `message`: A FormControl with a required validator.
     */
    contactForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', Validators.required),
    });

    /**
     * Configuration for sending contact form data.
     * @property {string} endPoint - URL of the endpoint for sending the data.
     * @property {function} body - Function for formatting the data for sending.
     * @property {object} options - HTTP options for the request.
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
     * Handles form submission, preventing the default form action and performing validation checks.
     * If all validation checks pass, sends the contact data using the `sendMail` method.
     *
     * @param {Event} event - The form submission event.
     */
    onSubmit(event: Event) {
        event.preventDefault();
        this.checkValidInput();
        this.checkValidMail();

        if (this.validName && this.validMail && this.validMessage) {
            this.sendMail();
        }
    }

    /**
     * Checks if all contact data fields (name, email, message) have a value and sets corresponding validation flags.
     */
    checkValidInput() {
        this.validName = this.contactData.name != '';
        this.validMail = this.contactData.email != '';
        this.validMessage = this.contactData.message != '';
    }

    /**
     * Validates the email field in the contact data using an `isEmail` function (assumed to be defined elsewhere).
     * Sets the `validMail` flag based on the result of the `isEmail` function. If `isEmail` returns undefined (potentially indicating an error), considers it valid as well.
     * 
     * @param {string} email - The email address to be validated (assumed to be retrieved from `this.contactData.email`).
     */
    checkValidMail() {
        const email = this.contactData.email;
        const validMailAdress = isEmail(email);

        this.validMail = validMailAdress || validMailAdress === undefined;
    }

    /**
     * Sends the contact data to the server using an HTTP POST request. 
     *
     * - Uses the `post.endPoint` URL for the request.
     * - Formats the contact data using the `post.body` function before sending.
     * - Subscribes to the HTTP response observable to handle success, error, and completion scenarios.
       - On success (2xx status code), logs a success message, sets a completion flag, and resets the form and mail input fields.
       - On error, logs the error message to the console.
       - On completion, logs a completion message to the console (informational only).  
     */
    sendMail() {
        this.http.post(this.post.endPoint, this.post.body(this.contactData))
            .subscribe({
                next: (response) => {
                    // Handle successful response (e.g., show success message)
                    console.log('Email sent successfully!');
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

    /**
     * Resets the validation flags and completion flag after a delay of 3 seconds.
     * This is typically used to clear the form state after a successful submission.
     */
    resetMailInput() {
        setTimeout(() => {
            this.validName = undefined;
            this.validMail = undefined;
            this.validMessage = undefined;
            this.completeMessage = false;
        }, 3000);
    }
}
