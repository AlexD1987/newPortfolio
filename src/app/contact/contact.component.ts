import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isEmail } from 'validator';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(private http: HttpClient) { }

  validName: boolean | undefined;
  validMail: boolean | undefined;
  validMessage: boolean | undefined;
  completeMessage = false;

  contactData = {
    name: "",
    email: "",
    message: ""
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
    console.log(this.contactData);

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

  resetMailInput() {
    setTimeout(() => {
      this.validName = undefined;
      this.validMail = undefined;
      this.validMessage = undefined;
      this.completeMessage = false;
    }, 3000);
  }

}
